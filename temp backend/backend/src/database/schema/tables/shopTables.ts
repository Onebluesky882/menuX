import { sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth-user';
import { shops } from './shops';
import { tableGridLayout } from './tableGridsLayout';

export const shopTables = pgTable('shop_tables', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name'),
  number: numeric('number'),
  layoutId: uuid('layout_id').references(() => tableGridLayout.id, {
    onDelete: 'cascade',
  }),
  position: text('position'),
  tableLink: text('table_link').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  createdById: text('created_by_id').references(() => user.id),
});

//const url = 'https://yourdomain.com/orderId to qr code';
