import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import * as request from 'supertest';
import { AllowdRoles } from './role.decorator';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../users/uesrs.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowdRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await this.userService.findById(decoded['id']);
        if (!user) {
          return false;
        }
        gqlContext['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }
        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
