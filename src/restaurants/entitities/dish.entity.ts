import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Restaurant } from './restaurant.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

@InputType('DishChoiceInputType', { isAbstract: true })
@ObjectType()
export class DishChoice {
  @Field((type) => String)
  name: string;
  @Field((type) => Int, { nullable: true })
  extra?: number;
}
@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
export class DishOption {
  @Field((type) => String)
  name: string;
  @Field((type) => [DishChoice], { nullable: true })
  choices?: DishChoice[];
  @Field((type) => Int, { nullable: true })
  extra?: number;
  @Field((type) => Boolean, { defaultValue: false })
  require: boolean;
}

@InputType('DishDivisionInputType', { isAbstract: true })
@ObjectType()
export class DishDivision {
  @Field((type) => String)
  name: string;
}
@InputType('DishDivisionOptionInputType', { isAbstract: true })
@ObjectType()
export class DishDivisionOption {
  @Field((type) => String)
  name: string;
  @Field((type) => [DishDivision], { nullable: true })
  divisions?: DishDivision[];
}

@InputType('CategoryInputTYpe', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo: string;

  @Field((type) => String)
  @Column()
  @Length(5, 140)
  description: string;

  @Field((type) => Restaurant)
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field((type) => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];

  @Field((type) => [DishDivision], { nullable: true })
  @Column({ type: 'json', nullable: true })
  divisions?: DishDivision[];

  @Field((type) => [OrderItem])
  @OneToMany((type) => OrderItem, (orderitem) => orderitem.dish)
  orderItems: OrderItem[];
}
