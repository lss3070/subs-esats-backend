import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrderResolver } from './orders.resolver';
import { Restaurant } from 'src/restaurants/entitities/restaurant.entity';
import { OrderItem } from './entities/order-item.entity';
import { Dish } from '../restaurants/entitities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish])],
  providers: [OrdersService, OrderResolver],
})
export class OrdersModule {}
