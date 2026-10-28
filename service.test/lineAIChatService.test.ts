jest.mock('../utility/openAIHelper', () => ({
  __esModule: true,
  default: { chat: { completions: { create: jest.fn() } } },
}));
jest.mock('../utility/config', () => ({
  __esModule: true,
  default: { OPEN_AI_KEY: 'test-key', LINE_AI_MODEL: 'gpt-4o-mini' },
}));
jest.mock('../model/LineConversation', () => ({
  LineConversationModel: { findOne: jest.fn(), updateOne: jest.fn() },
}));
jest.mock('../model/UserSetting', () => ({
  UserSettingModel: { findOne: jest.fn(), updateOne: jest.fn() },
}));
jest.mock('../utility/lineBotHelper', () => ({ lineBotHelper: { replyText: jest.fn() } }));

import { webhook } from '@line/bot-sdk';
import { LineConversationModel } from '../model/LineConversation';
import { UserSettingModel } from '../model/UserSetting';
import openai from '../utility/openAIHelper';
import { lineBotHelper } from '../utility/lineBotHelper';
import { handleLineAIChat } from '../service/lineAIChatService';

const create = openai.chat.completions.create as jest.Mock;
const findConversation = LineConversationModel.findOne as jest.Mock;
const saveConversation = LineConversationModel.updateOne as jest.Mock;
const findUser = UserSettingModel.findOne as jest.Mock;
const saveUser = UserSettingModel.updateOne as jest.Mock;
const reply = lineBotHelper.replyText as jest.Mock;
type TextEvent = webhook.MessageEvent & { message: webhook.TextMessageContent };
const event = (userId: string, id = 'event-1', text = '你好'): TextEvent =>
  ({
    type: 'message',
    webhookEventId: id,
    replyToken: `reply-${id}`,
    source: { type: 'user', userId },
    message: { type: 'text', id, text },
  } as TextEvent);

beforeEach(() => {
  jest.resetAllMocks();
  findConversation.mockReturnValue({ lean: async () => null });
  findUser.mockReturnValue({ lean: async () => ({ _id: 'existing-user', enableOpenAi: true }) });
  saveConversation.mockResolvedValue({});
  saveUser.mockResolvedValue({});
  reply.mockResolvedValue({});
  create.mockResolvedValue({ choices: [{ message: { content: '你好，有什麼可以幫忙？' } }] });
});

test('isolates users by verified LINE userId and preserves assistant roles in context', async () => {
  findConversation.mockImplementation(({ lineUserId }) => ({
    lean: async () => ({
      processedEventIds: [],
      messages: lineUserId === 'alice'
        ? [{ role: 'user', content: '我叫 Alice' }, { role: 'assistant', content: 'Alice 你好' }]
        : [],
    }),
  }));
  await handleLineAIChat(event('alice'));
  await handleLineAIChat(event('bob'));
  expect(create.mock.calls[0][0].messages.slice(1, 3)).toEqual([
    { role: 'user', content: '我叫 Alice' }, { role: 'assistant', content: 'Alice 你好' },
  ]);
  expect(JSON.stringify(create.mock.calls[1][0].messages)).not.toContain('Alice');
  expect(saveConversation.mock.calls.map(([filter]) => filter)).toEqual([
    { lineUserId: 'alice' }, { lineUserId: 'bob' },
  ]);
});

test('rejects an unknown user without creating an account or reading conversations', async () => {
  findUser.mockReturnValue({ lean: async () => null });
  await handleLineAIChat(event('alice'));
  expect(saveUser).not.toHaveBeenCalled();
  expect(findConversation).not.toHaveBeenCalled();
  expect(saveConversation).not.toHaveBeenCalled();
  expect(create).not.toHaveBeenCalled();
  expect(reply).toHaveBeenCalledWith('reply-event-1', '尚未開放 AI 使用權限');
});

test.each([false, undefined, null, 'true', 1, 'false', 0])(
  'rejects enableOpenAi=%p without reading or writing AI conversations',
  async (enableOpenAi) => {
    findUser.mockReturnValue({ lean: async () => ({ _id: 'existing-user', enableOpenAi }) });
    await handleLineAIChat(event('alice'));
    expect(findConversation).not.toHaveBeenCalled();
    expect(saveConversation).not.toHaveBeenCalled();
    expect(saveUser).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
    expect(reply).toHaveBeenCalledWith('reply-event-1', '尚未開放 AI 使用權限');
  }
);

test('checks permission again on the next message after access is revoked', async () => {
  await handleLineAIChat(event('alice', 'allowed'));
  findUser.mockReturnValue({ lean: async () => ({ _id: 'existing-user', enableOpenAi: false }) });
  await handleLineAIChat(event('alice', 'revoked'));
  expect(create).toHaveBeenCalledTimes(1);
  expect(findConversation).toHaveBeenCalledTimes(1);
  expect(saveConversation).toHaveBeenCalledTimes(1);
  expect(reply).toHaveBeenLastCalledWith('reply-revoked', '尚未開放 AI 使用權限');
});

test('ignores already processed webhook events', async () => {
  findConversation.mockReturnValue({ lean: async () => ({ processedEventIds: ['event-1'], messages: [] }) });
  await handleLineAIChat(event('alice'));
  expect(create).not.toHaveBeenCalled();
  expect(reply).not.toHaveBeenCalled();
});

test('ignores group messages even when the sender has a userId', async () => {
  const group = event('alice');
  group.source = { type: 'group', groupId: 'group', userId: 'alice' };
  await handleLineAIChat(group);
  expect(findConversation).not.toHaveBeenCalled();
  expect(create).not.toHaveBeenCalled();
});

test('serializes rapid turns from the same user', async () => {
  let finish!: (value: unknown) => void;
  create.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
  const first = handleLineAIChat(event('alice', 'first'));
  const second = handleLineAIChat(event('alice', 'second'));
  for (let i = 0; i < 10; i++) await Promise.resolve();
  expect(create).toHaveBeenCalledTimes(1);
  finish({ choices: [{ message: { content: 'first reply' } }] });
  await Promise.all([first, second]);
  expect(reply.mock.calls.map(([token]) => token)).toEqual(['reply-first', 'reply-second']);
});

test('does not save failed AI turns and gives a retry message', async () => {
  const log = jest.spyOn(console, 'error').mockImplementation(() => {});
  create.mockRejectedValueOnce(new Error('test failure'));
  await handleLineAIChat(event('alice'));
  expect(saveConversation).not.toHaveBeenCalled();
  expect(reply).toHaveBeenCalledWith('reply-event-1', '目前 AI 暫時無法回覆，請稍後再試。');
  log.mockRestore();
});

test('bounds stored context and sends text within the LINE limit', async () => {
  create.mockResolvedValue({ choices: [{ message: { content: '🙂'.repeat(3000) } }] });
  await handleLineAIChat(event('alice'));
  const text = reply.mock.calls[0][1];
  expect(text.length).toBeLessThanOrEqual(5000);
  expect(text).not.toMatch(/[\uD800-\uDBFF]…$/);
  expect(saveConversation.mock.calls[0][1].$push.messages.$slice).toBe(-20);
});
