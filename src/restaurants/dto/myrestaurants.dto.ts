import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entitities/restaurant.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class MyRestaurantsOutput extends CoreOutput {
  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
