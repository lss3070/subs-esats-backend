import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entitities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
//Service가 db에 접근
@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) //전달받은 Restaurant entity를 토대로 레포지토리 생성
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    //레포지토리의 메서드들로 db에 접근함
    return this.restaurants.find();
  }
  creatReesaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
