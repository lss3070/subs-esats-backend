import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entitities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { number } from 'joi';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Resolver((of) => Restaurant) //DB로 접근하는 RestaurantService메서드 활용..
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant]) //for grapql
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('input') CreateRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.creatReesaurant(CreateRestaurantDto);
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('input') UpdateRestaurantDto: UpdateRestaurantDto, //ArgsType을 쓴다면 @Args의 값은 비워둬야된다
  ) {
    return true;
  }
}
