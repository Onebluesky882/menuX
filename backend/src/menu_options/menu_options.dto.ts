import { InferInsertModel } from 'drizzle-orm';
import { menuOptions } from 'src/database/schema/menu_options';

export type MenuOption = InferInsertModel<typeof menuOptions>;
