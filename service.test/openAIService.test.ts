import { ChatCompletionMessageParam } from 'openai/resources/index.js';
import { processStockPostWithAI } from '../service/openAIService';

jest.setTimeout(99999);

describe('openAIService', () => {
  it('test ai service', async () => {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: 'You are a helpful assistant that processes stock-related requests. 請使用中文回答' },
      { role: 'user', content: '我想要了解關於 6197 這支股票最近的股價' },
    ];

    var result = await processStockPostWithAI(messages);
    console.log(result);
  });
});
