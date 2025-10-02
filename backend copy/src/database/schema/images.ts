import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth-user';
import { menus } from './menus';
import { shops } from './shops';

export const images = pgTable('images', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  type: text('type').notNull(), // e.g., 'menu' | 'shop' | 'profile'
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  menuId: uuid('menu_id').references(() => menus.id),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
});
