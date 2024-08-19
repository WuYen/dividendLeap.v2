import mongoose from 'mongoose';
import openai from '../utility/openAIHelper';
import { ChatCompletionMessageParam, ChatCompletionMessageToolCall, ChatCompletionTool } from 'openai/resources';
import { fetchPostDetail, fetchPostDetailProxy, searchPostsByTitle } from './pttStockPostService';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import config from '../utility/config';
import { getAuthorHistoryPosts } from './pttAuthorService';
import { AuthorStatsModel } from '../model/AuthorStats';

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
            description: '發文的id, 這個id是個時間戳記在文章網址的後面',
          },
        },
        required: ['postId'],
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
    const postInfo = await PostInfoModel.find({ id: postId }).lean().exec();
    //const href = `https://www.ptt.cc/${postInfo.href}`;
    const postContent = await fetchPostDetailProxy('M.1712676476.A.A46.html');

    const toolMessage: ChatCompletionMessageParam = {
      role: 'tool',
      content: postContent,
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

    messages.push(final_response.choices[0].message);
  } else {
    throw new Error('Sorry');
  }
  await mongoose.disconnect();
  return messages;
};
