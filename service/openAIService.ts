import mongoose from 'mongoose';
import openai from '../utility/openAIHelper';
import { ChatCompletionMessageParam, ChatCompletionMessageToolCall, ChatCompletionTool } from 'openai/resources';
import { searchPostsByTitle } from './pttStockPostService';
import { IPostInfo } from '../model/PostInfo';
import config from '../utility/config';

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'fetchPostsByStockCode',
      description: 'Fetch related posts by stock code from MongoDB',
      parameters: {
        type: 'object',
        properties: {
          stockCode: {
            type: 'string',
            description: 'The stock code to fetch related posts for',
          },
        },
        required: ['stockCode'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'summarizePosts',
      description: 'Summarize the fetched posts to provide a brief overview',
      parameters: {
        type: 'object',
        properties: {
          postIds: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Array of post IDs to summarize',
          },
        },
        required: ['postIds'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fetchStockPrice',
      description: 'Fetch past or real-time stock price',
      parameters: {
        type: 'object',
        properties: {
          stockCode: {
            type: 'string',
            description: 'The stock code to fetch the price for',
          },
          date: {
            type: 'string',
            description: 'The date for historical price, leave empty for real-time',
            nullable: true,
          },
        },
        required: ['stockCode'],
      },
    },
  },
];

export const processStockPostWithAI = async (messages: ChatCompletionMessageParam[]): Promise<any> => {
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

  let result;

  if (toolCall.function.name === 'fetchPostsByStockCode') {
    const stockCode = functionArguments.stockCode;

    var tempResult = await fetchPostsByStockCode(stockCode);

    result = tempResult.map((x) => {
      return {
        ...x,
        message: `[${x.tag}] ${x.title} -${x.author} ${x.date}`,
      };
    });
  } else if (toolCall.function.name === 'summarizePosts') {
    const postIds = functionArguments.postIds;

    const postDetails = await Promise.all(
      postIds.map(async (postId: string) => {
        return await fetchPostDetail(postId);
      })
    );

    const summary = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes stock posts.' },
        { role: 'user', content: `Please summarize the following posts: ${postDetails.join('\n')}` },
      ],
    });

    result = summary.choices[0].message?.content;
  } else if (toolCall.function.name === 'fetchStockPrice') {
    const stockCode = functionArguments.stockCode;
    const date = functionArguments.date || `過去三個月`; //TODO: 取得過去三個月

    result = await fetchStockPrice(stockCode, date);
  } else {
    result = { message: 'Function not recognized or not needed.' };
  }
};

async function fetchPostsByStockCode(stockCode: string): Promise<IPostInfo[]> {
  // 連接到 MongoDB
  await mongoose.connect(config.MONGODB_URI);
  var result = await searchPostsByTitle(stockCode);
  await mongoose.disconnect();
  return result;
}

async function fetchStockPrice(stockCode: any, date: any) {
  return null;
}

async function fetchPostDetail(params: any) {
  return null;
}
