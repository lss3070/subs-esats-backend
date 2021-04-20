import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Restaurant } from '../entitities/restaurant.entity';
@InputType()
export class RestaurantInput extends PaginationInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantsOutput extends PaginationOutput {
  @Field((type) => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
