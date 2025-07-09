import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { TablesModule } from './tables/tables.module';
import { ImagesModule } from './images/images.module';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { OrderTableModule } from './order-table/order-table.module';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';
import { TableGridLayoutModule } from './table-grid-layout/table-grid-layout.module';
import { ValidateModule } from './common/validate/validate.module';
import { MenusModule } from './menus/menus.module';
import { EmployersModule } from './employers/employers.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { GatewaysModule } from './gateways/gateways.module';
import { LineUsersModule } from './line_users/line_users.module';
import { ShopsModule } from './shops/shops.module';
import { R2Module } from './r2/r2.module';
import { MenuOptionsModule } from './menu_options/menu_options.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    TablesModule,
    ImagesModule,
    PagesModule,
    CategoriesModule,
    OrdersModule,
    CustomersModule,
    RolesModule,
    EmployeesModule,
    TableGridLayoutModule,
    ValidateModule,
    MenusModule,
    EmployersModule,
    RolesModule,
    OrderTableModule,
    OrderItemsModule,
    GatewaysModule,
    LineUsersModule,
    ShopsModule,
    R2Module,
    MenuOptionsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {}
}
