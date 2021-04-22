import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';

@InputType()
export class CreateOrderInput extends PickType(Order,["dishes"]{
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
