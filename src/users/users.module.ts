import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './uesrs.services';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigService, JwtService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
