import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RestaurantResolver,
  CategoryResolver,
  DishResolver,
} from './restaurants.resolver';
import { Restaurant } from './entitities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { Category } from './entitities/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { Dish } from './entitities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Dish, CategoryRepository])], // 순서 1.module에 repsittory imort함 2.restaurantService aksemfdjtj restaurantResolver import 3.restaurantResolver restaurantService.getAll returnㅡㅇㄹ함
  providers: [
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
    RestaurantService,
  ], //서비스는 class에서 inject할 수 있게 provider설정을 해주어야 한다.
})
export class RestaurantsModule {}
