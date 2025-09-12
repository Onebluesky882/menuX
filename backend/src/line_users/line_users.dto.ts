import { InferInsertModel } from 'drizzle-orm';
import { lineUser } from '../database/schema';

export type LineUsersDto = InferInsertModel<typeof lineUser>;
