import { InferInsertModel } from 'drizzle-orm';
import { orderItems } from 'src/database/schema';

export type OrderDtoItems = InferInsertModel<typeof orderItems>;
