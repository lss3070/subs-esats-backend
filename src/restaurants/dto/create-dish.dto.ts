import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Dish } from '../entitities/dish.entity';
import { DishDivisionOption } from '../entitities/dish-division';

@InputType()
export class CreateDishInput extends PickType(Dish, [
  'name',
  'price',
  'photo',
  'description',
  'options',
]) {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [DishDivisionOption], { nullable: true })
  divisions: DishDivisionOption[];
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}
