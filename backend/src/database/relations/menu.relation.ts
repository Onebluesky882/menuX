import { relations } from 'drizzle-orm';
import { images, menuOptions, menus } from '..';
import { shops } from '..';

//  menu reference shop
export const menuRelationShop = relations(menus, ({ one }) => ({
  shop: one(shops, {
    fields: [menus.shopId],
    references: [shops.id],
  }),
}));

/* 

สิ่งสำคัญ

ต้องมีทั้ง 2 ฝั่ง - Parent และ Child
relationName ต้องตรงกัน ระหว่าง 2 ฝั่ง
Parent ใช้ many() - Child ใช้ one()
Export ครบทุก relation ใน schema index
Import ใน database config ด้วย schema
*/
export const menuRelations = relations(menus, ({ many }) => ({
  images: many(images, {
    relationName: 'menuImages', // optional
  }),
  menuOptions: many(menuOptions, {
    relationName: 'menuOptions', // optional
  }),
}));
