import { InferInsertModel } from 'drizzle-orm';
import { orderItems } from '../database/schema';

export type OrderDtoItems = InferInsertModel<typeof orderItems>;
