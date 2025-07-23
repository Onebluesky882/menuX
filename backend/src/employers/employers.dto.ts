import { InferInsertModel } from 'drizzle-orm';
import { employers } from '../database';

export type EmployersDto = InferInsertModel<typeof employers>;
