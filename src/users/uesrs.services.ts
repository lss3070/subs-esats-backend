import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        //make error
        return { ok: false, error: 'There is a user with that email aleray' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true, error: null };
    } catch (e) {
      //make error
      return { ok: false, error: "Couldn't create account" };
    }
    //check new user
    // create user & hash the password
    //
  }
}
