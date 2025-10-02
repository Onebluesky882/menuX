import { relations } from 'drizzle-orm';
import { images, menuOptions, menus, shops } from '../schema';

//  Parent: shops
export const shopRelations = relations(shops, ({ many }) => ({
  menus: many(menus, { relationName: 'shopMenus' }),
}));

// menus (Child) → shop (Parent) + menuOptions/images (Child)
export const menuRelations = relations(menus, ({ one, many }) => ({
  shop: one(shops, {
    fields: [menus.shopId],
    references: [shops.id],
    relationName: 'shopMenus', // must match parent
  }),
  menuOptions: many(menuOptions, { relationName: 'menuOptions' }),
  images: many(images, { relationName: 'menuImages' }),
}));

// menuOptions (Child) → menus (Parent)
export const menuOptionRelations = relations(menuOptions, ({ one }) => ({
  menu: one(menus, {
    fields: [menuOptions.menuId],
    references: [menus.id],
    relationName: 'menuOptions', // must match parent
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
