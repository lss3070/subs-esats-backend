import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Dish } from './dish.entity';

@InputType('DishDivisionChoiceInputType', { isAbstract: true })
@ObjectType()
export class DishDivisionOption {
  @Field((type) => String)
  name: string;
}

@InputType('RestaurantDivisionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class DishDivision extends CoreEntity {
  @Field((type) => Dish)
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field((type) => [DishDivisionOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  divisions?: DishDivisionOption[];
}
