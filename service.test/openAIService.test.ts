import { ChatCompletionMessageParam } from 'openai/resources/index.js';
import { conversationWithAI } from '../service/openAIService';

jest.setTimeout(99999);

describe('openAIService', () => {
  it('test ai service', async () => {
    // 你是一個幫手負責從使用者輸入的文字訊息去決定要呼叫的function, 並解根據需要對取回來的資料進行處理回傳符合需求的回答, 這些需求都會是關於一個股票討論區的文章, 作者, 文章討論的標的為主,請使用中文回答
    // case1: 使用者可能輸入作者id => 取得該作者最近發文, 並包含發文相關股價資訊, 還有根據該作者過去發文統計出來的一些數值
    // case2: 文章標題的關鍵字
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          '你是一個幫手負責從使用者輸入的文字訊息去決定要呼叫的function, 並解根據需要對取回來的資料進行處理回傳符合需求的回答, 這些需求都會是關於一個股票討論區的文章, 作者, 文章討論的標的為主,請使用中文回答',
      },
      { role: 'user', content: '作者: rockken' },
    ];

    var result = await conversationWithAI(messages);
    console.log(result);
  });
});
