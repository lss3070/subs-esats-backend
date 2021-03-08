import { ObjectType, Field, PickType, InputType } from '@nestjs/graphql';
import { MutationOutput } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}
@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
