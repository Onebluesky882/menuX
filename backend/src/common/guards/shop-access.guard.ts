import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { ValidateService } from '../validate/validate.service';

@Injectable()
export class ShopAccessGuard implements CanActivate {
  constructor(private validateService: ValidateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { id: string };
    const shopId =
      request.params.id || request.params.shopId || request.body?.shopId;

    console.log('👮 ShopAccessGuard hit');
    console.log('👤 User:', user);
    console.log('🏪 Shop ID:', shopId);

    if (!user || !user.id || !shopId) {
      throw new ForbiddenException('Missing user or shopId');
    }
    // todo add role later
    // const allowedRoles = this.getAllowedRoles(user.role);
    await this.validateService.validateShop(user.id, shopId, [
      'owner',
      'manager',
      'staff',
      'customer',
    ]);

    return true;
  }
}
