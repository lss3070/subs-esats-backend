import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entitities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant]) //for grapql
  restaurants(@Args('veganOnly') veganOnly: string): Restaurant[] {
    return [];
  }
  @Mutation((returns) => Boolean)
  createRestaurant(@Args() CreateRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}
