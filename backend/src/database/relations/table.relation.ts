import { relations } from 'drizzle-orm';
import { shops, shopTables } from '../schema';

export const tableRelationShop = relations(shopTables, ({ one }) => ({
  shop: one(shops, {
    fields: [shopTables.shopId],
    references: [shops.id],
  }),
}));
