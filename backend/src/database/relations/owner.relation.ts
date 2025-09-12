import { relations } from 'drizzle-orm';
import { shops, user } from '../schema';

// defined
export const ownerRelationShop = relations(shops, ({ one }) => ({
  owner: one(user, {
    fields: [shops.ownerId],
    references: [user.id],
  }),
}));
