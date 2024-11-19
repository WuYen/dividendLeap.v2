import { ConversationModel, IConversation, IMessage } from '../../model/ConversationModel'; // 假設已建立此模型

class ConversationHandler {
  // 保存單個訊息到對話中
  async saveConversation(chatId: string, sender: 'bot' | 'user', message: string): Promise<void> {
    const timestamp = new Date();

    // 將資料存入 ConversationModel
    await ConversationModel.updateOne(
      { tgChatId: chatId },
      {
        $push: { messages: { sender, message, timestamp } },
      },
      { upsert: true } // 如果不存在，會自動建立新的文檔
    );
    console.log(`Message saved: [${sender}] ${message}`);
  }

  // 檢索最近有關的對話訊息
  async retrieveRelevantMessages(chatId: string): Promise<Array<IMessage>> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Step 1: 查詢最近一小時內的最多 30 條訊息
    let conversation = await ConversationModel.findOne(
      { tgChatId: chatId, 'messages.timestamp': { $gte: oneHourAgo } },
      { messages: { $slice: -30 } }
    ).lean();

    if (conversation?.messages && conversation.messages.length > 0) {
      // 如果有最近一小時內的訊息，返回這些訊息
      return conversation.messages;
    }

    // Step 2: 如果最近一小時內沒有訊息，則查詢最近的 5 條訊息
    conversation = await ConversationModel.findOne({ tgChatId: chatId }, { messages: { $slice: -5 } }).lean();

    return conversation?.messages || [];
  }

  // 更新對話：只保存當前用戶訊息和 AI 回覆
  async updateConversation(chatId: string, userMessage: IMessage, botReply: IMessage): Promise<void> {
    try {
      // 同時插入用戶訊息和 AI 回覆
      await ConversationModel.updateOne(
        { tgChatId: chatId },
        { $push: { messages: { $each: [userMessage, botReply] } } },
        { upsert: true }
      );
      console.log(`Conversation updated for chatId: ${chatId}`);
    } catch (error) {
      console.error('Error updating conversation:', error);
      throw error;
    }
  }
}

export const conversationHandler = new ConversationHandler();
