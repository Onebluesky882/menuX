import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employees, images, menus, roles, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and, inArray } from 'drizzle-orm';

@Injectable()
export class ValidateService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async validateImage(imageId: string, userId: string) {
    const [img] = await this.db
      .select({
        shopId: images.shopId,
        userId: images.userId,
        menuId: images.menuId,
      })
      .from(images)
      .where(eq(images.id, imageId));

    if (!img) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
    //
    if (img.shopId) {
      await this.validateShop(userId, img.shopId);
      return;
    }

    if (img.menuId) {
      const [menuRow] = await this.db
        .select({ shopId: menus.shopId })
        .from(menus)
        .where(eq(menus.id, img.menuId));
      if (!menuRow) {
        throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
      }
      await this.validateShop(userId, menuRow.shopId);
      return;
    }
    if (img.userId === userId) {
      return;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async validateShop(
    userId: string,
    shopId: string,
    allowRoles: string[] = ['owner', 'manager', 'staff'],
  ) {
    const isOwner = await this.db
      .select()
      .from(shops)
      .where(and(eq(shops.id, shopId), eq(shops.ownerId, userId)));

    if (isOwner.length > 0) return;

    const isEmployee = await this.db
      .select({
        employeeId: employees.id,
        roleName: roles.name,
      })
      .from(employees)
      .innerJoin(roles, eq(employees.roleId, roles.id))
      .where(
        and(
          eq(employees.shopId, shopId),
          eq(employees.userId, userId),
          inArray(roles.name, allowRoles),
        ),
      );
    if (isEmployee.length > 0) return;

    throw new HttpException(
      'You do not have permission to access',
      HttpStatus.FORBIDDEN,
    );
  }
}
