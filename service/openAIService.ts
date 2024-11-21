import mongoose from 'mongoose';
import openai from '../utility/openAIHelper';
import { ChatCompletionMessageParam, ChatCompletionMessageToolCall, ChatCompletionTool } from 'openai/resources';
import { fetchPostDetail, fetchPostDetailProxy, searchPostsByTitle } from './pttStockPostService';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import config from '../utility/config';
import { getAuthorHistoryPosts } from './pttAuthorService';
import { AuthorStatsModel } from '../model/AuthorStats';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { IConversation, IMessage } from '../model/ConversationModel';
import stockPriceService from './stockPriceService';
import { toDateString, today, todayDate } from '../utility/dateTime';

const MODEL = 'gpt-4o-mini';
const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'fetchAuthorPostAndStats',
      description: '這個function會取得指定作者的貼文還有根據過去貼文統計出來的一些相關數據',
      parameters: {
        type: 'object',
        properties: {
          author: {
            type: 'string',
            description: '作者的名字也就是id',
          },
        },
        required: ['author'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fetchPost',
      description: '用來分析某篇貼文, 這邊會提供這邊發文的內容',
      parameters: {
        type: 'object',
        properties: {
          postId: {
            type: 'string',
            description: '發文的id, 這個id是個時間戳記在文章網址的後面會是一個10碼的時間戳記格式',
          },
        },
        required: ['postId'],
      },
    },
  },
];

const miniTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'fetchStockPrice',
      description: '用台灣(台北)股票代號來取得最新的股價',
      parameters: {
        type: 'object',
        properties: {
          stockNo: {
            type: 'string',
            description: '股票的代碼, 純數字, 例如 台積電 那預期就會是 2330',
          },
        },
        required: ['stockNo'],
      },
    },
  },
];

export const conversationWithAI = async (messages: ChatCompletionMessageParam[]): Promise<any> => {
  // Example of creating a chat completion with tools and messages
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
    tools: tools,
  });

  if (!response.choices[0] || !response.choices[0].message.tool_calls) {
    throw new Error('error in process conversation');
  }

  // Extract the arguments for the function call
  const toolCall = response.choices[0].message.tool_calls[0] as ChatCompletionMessageToolCall;
  const functionArguments = JSON.parse(toolCall.function.arguments);

  await mongoose.connect(config.MONGODB_URI);
  if (toolCall.function.name === 'fetchAuthorPostAndStats') {
    const author = functionArguments.author;
    const posts = await getAuthorHistoryPosts(author);
    const authorStats = await AuthorStatsModel.find({ name: author }).lean().exec();
    const toolMessage: ChatCompletionMessageParam = {
      role: 'tool',
      content: JSON.stringify({
        author,
        posts,
        authorStats,
      }),
      tool_call_id: toolCall.id,
    };

    messages.push(response.choices[0].message);
    messages.push(toolMessage);

    // 再次调用 AI，将 tool message 发送给 AI
    const final_response = await openai.chat.completions.create({
      model: MODEL, // 使用适当的模型
      messages: messages,
      tools: tools, // 假设你有定义的工具
    });

    // 输出 AI 生成的最终结果
    // 表示不需要繼續 final_response.choices[0].finish_reason == 'stop'
    console.log(final_response.choices[0].message.content);

    messages.push(final_response.choices[0].message);
  } else if (toolCall.function.name === 'fetchPost') {
    const postId = functionArguments.postId;
    const postInfo = (await PostInfoModel.findOne({ id: postId }).exec()) as IPostInfo;
    const href = `https://www.ptt.cc/${postInfo.href}`;
    const postContent = await fetchPostDetailProxy(href);

    const toolMessage: ChatCompletionMessageParam = {
      role: 'tool',
      content: postContent,
      tool_call_id: toolCall.id,
    };

    messages.push(response.choices[0].message);
    messages.push(toolMessage);

    const final_response = await openai.chat.completions.create({
      model: MODEL, // 使用适当的模型
      messages: messages,
      tools: tools, // 假设你有定义的工具
    });

    messages.push(final_response.choices[0].message);
  } else {
    throw new Error('Sorry');
  }
  await mongoose.disconnect();
  return messages;
};

export async function structuredOutput(articleContent: string) {
  // Define the schema using Zod
  const StockAnalysisSchema = z.object({
    tag: z.string(), // Original: 標的
    title: z.string(), // Original: 標題
    category: z.string(), // Original: 分類
    entryPoint: z.string().or(z.literal('')), // Original: 進場
    takeProfit: z.string().or(z.literal('')), // Original: 停利
    stopLoss: z.string().or(z.literal('')), // Original: 停損
    summary: z.string(), // Original: 重點摘要
    additionalInfo: z.string().or(z.literal('')), // Original: 其他資訊
  });

  // Prompt with the article content for analysis
  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini-2024-07-18',
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: `你是一個有幫助的助手，負責分析股票文章並提供結構化輸出。
        
        輸出應遵循以下結構，下面是每個欄位希望的內容說明：
        {
          "tag": "文章標籤 通常是在[]裡面的值只要保留純文字 例如: 標的。",
          "title": "文章標題，通常是跟在文章標籤後面。",
          "category": "文章分類，通常表示市場情緒，例如 '多'（看漲）或 '空'（看跌）。",
          "entryPoint": "進場點，描述建議的進場價格或進場條件。如果文章中沒有明確提到，請使用 '' 。",
          "takeProfit": "停利點，描述實現利潤的建議價格或條件。如果文章中沒有明確提到，請使用 '' 。",
          "stopLoss": "停損點，描述風險控制措施，例如特定的價格或條件。如果文章中沒有明確提到，請使用 '' 。",
          "summary": "文章的重點摘要，盡量包含到所有提到的內容",
          "additionalInfo": "補充說明，與正文摘要無關的其他資訊，例如: 背景資料或補充觀察、有對帳單。"
        }
        
        如果文章中沒有明確提到某個欄位的資訊，請使用 '' 作為該欄位的值。`,
      },
      {
        role: 'user',
        content: `請分析以下文章，根據提供的結構提取關鍵資訊，並以 JSON 格式返回：

        ${articleContent}

        請根據以上結構提供結構化輸出。`,
      },
    ],
    response_format: zodResponseFormat(StockAnalysisSchema, 'stock_analysis'),
  });

  // Extract and display the structured output
  const stock_analysis = completion.choices[0].message.parsed;
  console.log(stock_analysis);
}

export async function handleTGChat(messages: IMessage[]): Promise<string> {
  try {
    // Convert IMessage array to OpenAI Chat Completion format
    const openAIMessages: ChatCompletionMessageParam[] = messages.map((message) => ({
      role: message.sender === 'ai' ? 'assistant' : 'user',
      content: message.message,
    }));

    const conversation = [
      {
        role: 'system',
        content: `你是一個有幫助的助手，負責分析telegram chat 的輸入訊息並產生回覆的內容`,
      },
      ...openAIMessages,
    ] as ChatCompletionMessageParam[];

    // Call OpenAI's chat completion API
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: conversation,
      temperature: 0.7,
      tools: miniTools,
      tool_choice: 'auto',
    });

    if (response.choices[0] && response.choices[0].message.tool_calls) {
      const toolCall = response.choices[0].message.tool_calls[0] as ChatCompletionMessageToolCall;

      if (toolCall && toolCall.function.name === 'fetchStockPrice') {
        const functionArguments = JSON.parse(toolCall.function.arguments);
        const stockNo = functionArguments.stockNo;
        const start = todayDate();
        start.setDate(start.getDate() - 3); // Deduct 5 days
        const historicalInfo = await stockPriceService.getStockPriceByDates(stockNo, toDateString(start), today());

        const toolMessage: ChatCompletionMessageParam = {
          role: 'tool',
          content: JSON.stringify(historicalInfo),
          tool_call_id: toolCall.id,
        };

        conversation.push(response.choices[0].message);
        conversation.push(toolMessage);

        const final_response = await openai.chat.completions.create({
          model: MODEL, // 使用适当的模型
          messages: conversation,
          tools: tools, // 假设你有定义的工具
        });
        return final_response.choices[0]?.message?.content ?? '對話發生了問題，請稍後再試。';
      }
    }
    // Extract and return the reply message from OpenAI's response
    return response.choices[0]?.message?.content ?? '對話發生了問題，請稍後再試。';
  } catch (error) {
    console.error('Error handling TG chat:', error);
    return '抱歉，我無法處理這個請求。';
  }
}

export default { handleTGChat, structuredOutput, conversationWithAI };
