import { InferInsertModel } from 'drizzle-orm';
import { categories } from '../database';

export type InsertCategories = InferInsertModel<typeof categories>;

export type CategoryDto = {
  name: string;
};
