import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UserService } from '../users/uesrs.services';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthorizationModule {}
