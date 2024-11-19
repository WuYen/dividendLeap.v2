import mongoose, { Model, Schema } from 'mongoose';

interface IMessage {
  sender: 'bot' | 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface IConversation {
  tgChatId: string;
  messages: IMessage[];
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ['bot', 'user'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const ConversationSchema = new Schema<IConversation>({
  tgChatId: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

const ConversationModel: Model<IConversation> = mongoose.model<IConversation>('Conversation', ConversationSchema);

export { ConversationModel, IConversation, IMessage };
