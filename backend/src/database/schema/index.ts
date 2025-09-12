import { account, session, user, verification } from './auth-user';
import { images } from './images';
import { lineUser } from './lineUser';
import { menuOptions } from './menuOptions';
import { menus } from './menus';
import { orderItems } from './orderItems';
import { orders } from './orders';
import { orderTable } from './orderTable';
import { shops } from './shops';
import { shopTables } from './shopTables';
import { slipVerifications } from './slipVerifications';
import { tableGridLayout } from './tableGridsLayout';

export * from './auth-user';
export * from './images';
export * from './lineUser';
export * from './menuOptions';
export * from './menus';
export * from './orderItems';
export * from './orders';
export * from './orderTable';
export * from './shops';
export * from './shopTables';
export * from './slipVerifications';
export * from './tableGridsLayout';

export * from '../relations/image.relation';
export * from '../relations/menu.relation';
export * from '../relations/orders.relation';
export * from '../relations/owner.relation';

export const schema = {
  user,
  account,
  session,
  verification,
  orders,
  shops,
  shopTables,
  orderTable,
  images,
  tableGridLayout,
  menus,
  orderItems,
  lineUser,
  menuOptions,
  slipVerifications,
};
