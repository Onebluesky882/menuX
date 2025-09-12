import { InferInsertModel } from 'drizzle-orm';
import { menuOptions } from '../database/schema';

export type MenuOption = InferInsertModel<typeof menuOptions>;
