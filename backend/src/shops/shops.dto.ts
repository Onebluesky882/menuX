import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { shops } from '../database/schema';

export type SelectShop = InferSelectModel<typeof shops>;
export type InsertShop = InferInsertModel<typeof shops>;

export type ReceiveBank = {
  receiveBank: string | null | undefined;
  receiverId?: string | null | undefined;
  receiverName?: string | null | undefined;
};
