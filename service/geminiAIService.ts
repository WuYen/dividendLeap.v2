import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../utility/config';
import fs from 'fs/promises';

const genAI = new GoogleGenerativeAI(config.GEMINI_KEY);

export async function generateWithText(prompt: string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

const prompt =
  '以這樣的格式去列出進退場停利機制 進場: ?? or 空白 退場:?? or 空白 停利:?? or 空白 ' +
  '並列出原文重點\n' +
  '文章內容如下\n' +
  '作者agogo1202 (阿GOGOGO)\n' +
  '看板Stock\n' +
  '標題[標的] 6197 佳必琪 多\n' +
  '時間Sun May 12 18:14:25 2024\n' +
  '\n' +
  '標的：\n' +
  ' 6197 佳必琪\n' +
  '\n' +
  '分類：多/空/討論/心得\n' +
  ' 多\n' +
  '\n' +
  '分析/正文：\n' +
  '【基本面】：公司三月法說宣布有望打入GB200供應鏈\n' +
  '以及佳必琪本來就是美超微概念股\n' +
  '重點Q1 EPS 1.94\n' +
  '個人推估 Q2 EPS 2.1以上應該問題不大\n' +
  '(只要營收維持在5~6億)\n' +
  '公司法說有說下半年營收優於上半年~\n' +
  '營收比重約是4:6\n' +
  '假設H1 EPS預估4元\n' +
  '則2024 EPS有機會挑戰10元\n' +
  'AI概念股(GB200概念股)本益比可給20~25倍\n' +
  '\n' +
  '【籌碼面】：\n' +
  '投信約140附近進場布局\n' +
  '1000張大戶約47%\n' +
  '30張以下散戶約28%\n' +
  '對我來說算健康的大戶散戶比例\n' +
  '\n' +
  '【技術面】：\n' +
  'MACD即將翻紅\n' +
  '月線禮拜一扣167\n' +
  '禮拜二扣150.5\n' +
  '最慢禮拜二只要股價不大跌\n' +
  '往上攻擊月線就會翻揚\n' +
  '\n' +
  '\n' +
  '進退場機制：\n' +
  '(非長期投資者，必須有停損機制。討論、心得類免填)\n' +
  '進場點：150以下進場\n' +
  '\n' +
  '停損點：進場價-5%\n' +
  '(不要在那邊講什麼以前買過50佳必琪之類的話...)\n' +
  '買50停損也是-5% 買147停損也是-5%\n' +
  '目前指數是在20600附近 不能再拿15600的股價來對比...\n' +
  '禮拜一月線應該在147附近\n' +
  '買在150以下停損設5%\n' +
  '應該不容易觸碰到停損\n' +
  '\n' +
  '\n' +
  '停利點\n' +
  '保守者可突破180(創短線新高)\n' +
  '185左右就先賣一趟\n' +
  '此處獲利約+25% (風險報酬比也有1:5)\n' +
  '\n' +
  '個人認為是有機會漲到20倍本益比\n' +
  '也就是200左右!!\n' +
  '\n' +
  '\n' +
  '補充：目前市場資金都跑去傳產~\n' +
  '電子股確實比較缺乏人氣\n' +
  '不過我本來就不愛湊熱鬧XD\n' +
  '星期一開盤可先觀察\n' +
  '資金是否持續停留在航運、金融或營建股\n' +
  '或是漲台積中小跌倒\n' +
  '但5/21輝達公布財報\n' +
  '6月初電腦展大咖又要來台灣\n' +
  '小弟認為下半年AI還是會有機會再漲一波!!\n' +
  '\n' +
  '個人最慢星期二會進場(到時候再PO對帳單上來)';

generateWithText(prompt);

export const generateWithImage = async (filePath: string) => {
  try {
    // Read image file
    //const filePath = 'some-image.jpeg';
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString('base64');

    const promptConfig = [
      { text: 'Can you tell me about this image whats happening there?' },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64,
        },
      },
    ];

    const geminiModel = genAI.getGenerativeModel({
      model: 'gemini-pro-vision',
    });

    const result = await geminiModel.generateContent({
      contents: [{ role: 'user', parts: promptConfig }],
    });
    const response = await result.response;
    console.log(response.text());
  } catch (error) {
    console.log(' response error', error);
  }
};
