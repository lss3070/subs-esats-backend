import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entitities/restaurant.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dto/create-restaurant.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { RestaurantService } from './restaurant.service';
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantOutput)
  @Role(['Owner'])
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }
}
