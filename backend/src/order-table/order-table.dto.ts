import { InferInsertModel } from 'drizzle-orm';
import { orderTable } from '../database/schema';

export type InsertOrdersTable = InferInsertModel<typeof orderTable>;

export type CreateOrderTableDto = InsertOrdersTable;
