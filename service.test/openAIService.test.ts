import { ChatCompletionMessageParam } from 'openai/resources/index.js';
import { conversationWithAI } from '../service/openAIService';

jest.setTimeout(99999);

describe('openAIService', () => {
  // case1: 使用者可能輸入作者id => 取得該作者最近發文, 並包含發文相關股價資訊, 還有根據該作者過去發文統計出來的一些數值
  // case2: 進一步瞭解該作者某篇文提到的股票
  it('test ai service', async () => {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          '你是一個幫手負責從使用者輸入的文字訊息去決定要呼叫的function, 並解根據需要對取回來的資料進行處理回傳符合需求的回答, 這些需求都會是關於一個股票討論區的文章, 作者, 文章討論的標的為主,請使用中文回答,不要有任何假設,單純看數據說話',
      },
      { role: 'user', content: '作者: rockken' },
    ];

    var result = await conversationWithAI(messages);
    console.log(result);
    messages.push({ role: 'user', content: '想要了解勤凱這篇貼文' });
    var result = await conversationWithAI(messages);
    console.log(result);
  });

  // it('analysis post content', async () => {
  //   const messages: ChatCompletionMessageParam[] = [
  //     {
  //       role: 'system',
  //       content:
  //         '你是一個幫手負責從使用者輸入的文字訊息去決定要呼叫的function, 並解根據需要對取回來的資料進行處理回傳符合需求的回答, 這些需求都會是關於一個股票討論區的文章, 作者, 文章討論的標的為主,請使用中文回答',
  //     },
  //     { role: 'user', content: '作者: rockken' },
  //     {
  //       role: 'assistant',
  //       content: null,
  //       tool_calls: [
  //         {
  //           id: 'call_fby4Z4Sre0iNrtBOCkriIxic',
  //           type: 'function',
  //           function: {
  //             name: 'fetchAuthorPostAndStats',
  //             arguments: '{\n  "author": "rockken"\n}',
  //           },
  //         },
  //       ],
  //       refusal: null,
  //     },
  //     {
  //       role: 'tool',
  //       content:
  //         '{"author":"rockken","posts":[{"_id":"661f3eb84fb95c430bf05ceb","tag":"標的","title":"5381 合正","href":"/bbs/Stock/M.1713323414.A.4A6.html","author":"rockken","date":"4/17","batchNo":1713323703791,"id":1713323414,"__v":0,"stockNo":"5381","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"勤凱  4760","href":"/bbs/Stock/M.1712676476.A.A46.html","author":"rockken","date":"4/09","id":1712676476,"batchNo":1723798632036,"stockNo":"4760","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"雷科 6207","href":"/bbs/Stock/M.1711995317.A.E6C.html","author":"rockken","date":"4/02","id":1711995317,"batchNo":1723798632036,"stockNo":"6207","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"1582 信錦  小短多","href":"/bbs/Stock/M.1699275159.A.546.html","author":"rockken","date":"11/06","id":1699275159,"batchNo":1723798632036,"stockNo":"1582","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"心得","title":"新手小弟還在找浮板的股市經驗談","href":"/bbs/Stock/M.1676033787.A.1B9.html","author":"rockken","date":"2/10","id":1676033787,"batchNo":1723798632036,"stockNo":"","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"6285 啓碁","href":"/bbs/Stock/M.1657840332.A.A88.html","author":"rockken","date":"7/15","id":1657840332,"batchNo":1723798632036,"stockNo":"6285","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"胡連 6279  多","href":"/bbs/Stock/M.1648567688.A.747.html","author":"rockken","date":"3/29","id":1648567688,"batchNo":1723798632036,"stockNo":"6279","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"3645 達邁","href":"/bbs/Stock/M.1642640658.A.E41.html","author":"rockken","date":"1/20","id":1642640658,"batchNo":1723798632036,"stockNo":"3645","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"8431 匯鑽科  多","href":"/bbs/Stock/M.1639150960.A.C2B.html","author":"rockken","date":"12/10","id":1639150960,"batchNo":1723798632036,"stockNo":"8431","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"請益","title":"新手要如何在股板生存","href":"/bbs/Stock/M.1614318984.A.117.html","author":"rockken","date":"2/26","id":1614318984,"batchNo":1723798632036,"stockNo":"","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"力特 3051","href":"/bbs/Stock/M.1614134826.A.5C7.html","author":"rockken","date":"2/24","id":1614134826,"batchNo":1723798632036,"stockNo":"3051","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false},{"tag":"標的","title":"博大 8109 多","href":"/bbs/Stock/M.1606199640.A.40D.html","author":"rockken","date":"11/24","id":1606199640,"batchNo":1723798632036,"stockNo":"8109","isFavorite":true,"historicalInfo":[],"processedData":[],"isRecentPost":false}],"authorStats":[{"_id":"6699e075f3cea6e922b80495","name":"rockken","mean":60.88333333333333,"maxRate":101.79,"minRate":0,"median":80.86,"stdDev":43.89078440351181,"posts":[{"title":"5381 合正","href":"/bbs/Stock/M.1713323414.A.4A6.html","date":"20240417","id":1713323414,"highest":{"date":"20240417","diff":0,"diffPercent":0,"price":39.15,"type":["highest"]},"_id":"669fdb049659246bbb02aab6"},{"title":"勤凱  4760","href":"/bbs/Stock/M.1712676476.A.A46.html","date":"20240409","id":1712676476,"highest":{"date":"20240528","diff":79.7,"diffPercent":101.79,"price":158,"type":["highest"]},"_id":"669fdb049659246bbb02aab7"},{"title":"雷科 6207","href":"/bbs/Stock/M.1711995317.A.E6C.html","date":"20240402","id":1711995317,"highest":{"date":"20240705","diff":38.45,"diffPercent":80.86,"price":86,"type":["highest"]},"_id":"669fdb049659246bbb02aab8"}],"totalRate":182.65,"score":69.97039429537328,"combinedRank":1,"author":"6689578ba6acaa06088c48c6","__v":0,"createdAt":"2024-07-19T03:41:41.127Z","updatedAt":"2024-07-23T16:32:04.013Z"}]}',
  //       tool_call_id: 'call_grgNRsqLLt3E1NmoNGgu0Ylk',
  //     },
  //     {
  //       role: 'assistant',
  //       content:
  //         '作者「rockken」的帖子如下：\n' +
  //         '\n' +
  //         '1. **5381 合正** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1713323414.A.4A6.html) (發布日期: 4/17)\n' +
  //         '2. **勤凱 4760** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1712676476.A.A46.html) (發布日期: 4/09)\n' +
  //         '3. **雷科 6207** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1711995317.A.E6C.html) (發布日期: 4/02)\n' +
  //         '4. **1582 信錦 小短多** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1699275159.A.546.html) (發布日期: 11/06)\n' +
  //         '5. **新手小弟還在找浮板的股市經驗談** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1676033787.A.1B9.html) (發布日期: 2/10)\n' +
  //         '6. **6285 啓碁** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1657840332.A.A88.html) (發布日期: 7/15)\n' +
  //         '7. **胡連 6279 多** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1648567688.A.747.html) (發布日期: 3/29)\n' +
  //         '8. **3645 達邁** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1642640658.A.E41.html) (發布日期: 1/20)\n' +
  //         '9. **8431 匯鑽科 多** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1639150960.A.C2B.html) (發布日期: 12/10)\n' +
  //         '10. **新手要如何在股板生存** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1614318984.A.117.html) (發布日期: 2/26)\n' +
  //         '11. **力特 3051** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1614134826.A.5C7.html) (發布日期: 2/24)\n' +
  //         '12. **博大 8109 多** - [查看文章](https://www.stockdiscussion.com/bbs/Stock/M.1606199640.A.40D.html) (發布日期: 11/24)\n' +
  //         '\n' +
  //         '根據其過去的貼文數據分析，rockken的留言表現如下：\n' +
  //         '- 平均漲幅率: 60.88%\n' +
  //         '- 最大漲幅率: 101.79%\n' +
  //         '- 最小漲幅率: 0%\n' +
  //         '- 中位數漲幅率: 80.86%\n' +
  //         '- 標準差: 43.89\n' +
  //         '\n' +
  //         'rockken的總評分為：69.97，並在相應的排名中表現良好。',
  //       refusal: null,
  //     },
  //   ];
  //   var result = await conversationWithAI(messages);
  //   console.log(result);
  // });
});
