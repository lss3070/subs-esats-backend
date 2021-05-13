import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entitities/restaurant.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class MyRestaurantInput extends PickType(Restaurant, ['id']) {}

@ObjectType()
export class MyRestaurantOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
