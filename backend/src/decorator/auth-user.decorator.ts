import type {ExecutionContext} from '@nestjs/common';
import {createParamDecorator} from '@nestjs/common';

import type {UserEntity} from '../modules/user/entities/user.entity';

export type IAuthUser = UserEntity;

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: unknown = request.user;

    if (user) {
      return user as IAuthUser;
    }

    return null;
  })();
}
