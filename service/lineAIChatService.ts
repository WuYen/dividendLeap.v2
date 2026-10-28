import { webhook } from '@line/bot-sdk';
import { LineConversationModel } from '../model/LineConversation';
import { UserSettingModel } from '../model/UserSetting';
import { MessageChannel } from '../type/notify';
import openai from '../utility/openAIHelper';
import config from '../utility/config';
import { lineBotHelper } from '../utility/lineBotHelper';

type TextEvent = webhook.MessageEvent & { message: webhook.TextMessageContent };
const HISTORY_LIMIT = 20;
// Serialize turns for each user within this server process so rapid messages retain context.
const pendingTurns = new Map<string, Promise<void>>();

async function respond(event: TextEvent, lineUserId: string): Promise<void> {
  const eventId = event.webhookEventId ?? event.message.id;
  let answer: string;
  try {
    const user = await UserSettingModel.findOne({
      channels: { $elemMatch: { type: MessageChannel.Line, token: lineUserId } },
    }).lean();
    // Lean preserves the stored value: only the boolean true grants access.
    if (user?.enableOpenAi !== true) {
      await lineBotHelper.replyText(event.replyToken!, '尚未開放 AI 使用權限');
      return;
    }

    const conversation = await LineConversationModel.findOne({ lineUserId }).lean();
    if (conversation?.processedEventIds.includes(eventId)) return;

    if (!config.OPEN_AI_KEY) throw new Error('OPEN_AI_KEY is not configured');
    const response = await openai.chat.completions.create(
      {
        model: config.LINE_AI_MODEL,
        messages: [
          {
            role: 'system',
            content: '你是 LINE 上的個人 AI 助手，請以繁體中文簡潔回答。目前只能文字對話，沒有查詢資料庫、即時資料或操作外部服務的工具，請勿宣稱已執行這些操作。',
          },
          ...(conversation?.messages ?? []).slice(-HISTORY_LIMIT).map(({ role, content }) => ({ role, content })),
          { role: 'user', content: event.message.text },
        ],
        max_tokens: 1000,
      },
      { timeout: 20000, maxRetries: 0 }
    );
    const content = response.choices[0]?.message.content?.trim();
    if (!content) throw new Error('OpenAI returned an empty reply');
    // LINE text messages accept up to 5,000 UTF-16 code units. Avoid splitting surrogate pairs.
    answer = content.length <= 4900 ? content : Array.from(content.slice(0, 4898)).slice(0, -1).join('') + '…';
    const timestamp = new Date();
    await LineConversationModel.updateOne(
      { lineUserId },
      {
        $setOnInsert: { lineUserId },
        $push: {
          messages: {
            $each: [
              { role: 'user', content: event.message.text, timestamp },
              { role: 'assistant', content: answer, timestamp },
            ],
            $slice: -HISTORY_LIMIT,
          },
          processedEventIds: { $each: [eventId], $slice: -100 },
        },
      },
      { upsert: true, runValidators: true }
    );
  } catch (error) {
    // SDK errors can contain request headers; do not log credentials or conversation content.
    console.error('[LINE][AI] Chat failed:', error instanceof Error ? error.name : 'UnknownError');
    answer = '目前 AI 暫時無法回覆，請稍後再試。';
  }
  await lineBotHelper.replyText(event.replyToken!, answer);
}

export async function handleLineAIChat(event: TextEvent): Promise<void> {
  if (
    event.source?.type !== 'user' ||
    typeof event.source.userId !== 'string' ||
    !event.source.userId ||
    !event.replyToken
  ) return;
  const lineUserId = event.source.userId;
  const previous = pendingTurns.get(lineUserId) ?? Promise.resolve();
  const current = previous.catch(() => undefined).then(() => respond(event, lineUserId));
  pendingTurns.set(lineUserId, current);
  try {
    await current;
  } finally {
    if (pendingTurns.get(lineUserId) === current) pendingTurns.delete(lineUserId);
  }
}
