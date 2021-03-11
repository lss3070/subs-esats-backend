import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './uesrs.services';
import { Verifiation } from './entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verifiation])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
