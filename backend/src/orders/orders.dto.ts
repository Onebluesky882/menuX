import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { orders } from 'src/database';

export type InsertOrders = InferInsertModel<typeof orders>;
export type SelectOrders = InferSelectModel<typeof orders>;
