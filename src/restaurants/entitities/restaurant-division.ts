import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Dish } from './dish.entity';

@InputType('RestaurantDivisionChoiceInputType', { isAbstract: true })
@ObjectType()
export class RestaurantDivisionOption {
  @Field((type) => String)
  name: string;
}

@InputType('RestaurantDivisionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class RestaurantDivision extends CoreEntity {
  @Field((type) => Dish)
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field((type) => [RestaurantDivisionOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  divisions?: RestaurantDivisionOption[];
}
