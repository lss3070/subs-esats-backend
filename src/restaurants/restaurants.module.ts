import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver } from './restaurants.resolver';
import { Restaurant } from './entitities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { Category } from './entitities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])], // 순서 1.module에 repsittory imort함 2.restaurantService aksemfdjtj restaurantResolver import 3.restaurantResolver restaurantService.getAll returnㅡㅇㄹ함
  providers: [RestaurantResolver, RestaurantService], //서비스는 class에서 inject할 수 있게 provider설정을 해주어야 한다.
})
export class RestaurantsModule {}
