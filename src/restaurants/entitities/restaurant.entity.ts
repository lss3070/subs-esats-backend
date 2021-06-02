import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Dish } from './dish.entity';
import { Order } from 'src/orders/entities/order.entity';

@InputType('DivisionInputType', { isAbstract: true })
@ObjectType()
export class RestaurantDivision {
  @Field((type) => String)
  name: string;
}

//entity 파일은 db틀이라고 생각하면 될듯 여기서 DB의 모델을 생성하고 자동으로 graphql에 스키마 작성
@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity() //decorator
export class Restaurant extends CoreEntity {
  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => Number, { nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  zipCode: number;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  detailAddress: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  description: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.restaurant)
  orders: Order[];

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((type) => [Dish])
  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @Field((type) => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUtil: Date;

  @Field((type) => [RestaurantDivision])
  @Column({ type: 'json', nullable: true })
  divisions: RestaurantDivision[];
}
