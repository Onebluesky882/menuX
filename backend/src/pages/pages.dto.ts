import { InferInsertModel } from 'drizzle-orm';
import { pages } from '../database';
export type InsertPages = InferInsertModel<typeof pages>;

export type PageDto = Pick<InsertPages, 'name'>;
