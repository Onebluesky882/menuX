import { InferInsertModel } from 'drizzle-orm';
import { tableGridLayout } from 'src/database/schema';

export type InsertTableGridLayout = InferInsertModel<typeof tableGridLayout>;

export type UpdateTableGridLayout = Pick<
  InsertTableGridLayout,
  'columns' | 'rows'
>;
