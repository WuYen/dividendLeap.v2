import { model, Schema } from 'mongoose';

export interface ILineMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ILineConversation {
  lineUserId: string;
  messages: ILineMessage[];
  processedEventIds: string[];
}

const MessageSchema = new Schema<ILineMessage>(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  { _id: false }
);

const LineConversationSchema = new Schema<ILineConversation>(
  {
    lineUserId: { type: String, required: true, unique: true },
    messages: { type: [MessageSchema], default: [] },
    processedEventIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const LineConversationModel = model<ILineConversation>('LineConversation', LineConversationSchema);
