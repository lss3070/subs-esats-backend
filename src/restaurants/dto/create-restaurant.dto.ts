import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { Restaurant } from '../entitities/restaurant.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'zipCode',
  'address',
  'detailAddress',
  'description',
  'divisions',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field((type) => Int)
  restaurantId?: number;
}
