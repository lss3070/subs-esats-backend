import {
  ObjectType,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { Restaurant } from '../../restaurants/entitities/restaurant.entity';
import { Order } from '../../orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field((type) => Number, { nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  zipCode: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  address: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  detailAddress: string;

  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @Field((type) => [Payment])
  @OneToMany((type) => Payment, (payment) => payment.user, { eager: true })
  payments: Payment[];

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.driver)
  rides: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException(); //서비스 내부에서 catch하는것

        //정리
        /*
        hash function : input 문자열에 대해 이상한 output 문자열을 출력하는 함수
        - 일방향성: output을 토대로 input 역추정 불가.
      - input을 조금만 수정해도 output은 크게 달라짐.
      - input에 대한 output은 언제나 동일 => rainbow table에서 확인 가능.
      - salt(짧은 임의의 텍스트)와 함께 hash 함수 실행 => rainbow table에서 확인 불가.
        */
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
