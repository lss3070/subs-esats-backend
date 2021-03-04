import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//entity 파일은 db틀이라고 생각하면 될듯 여기서 DB의 모델을 생성하고 자동으로 graphql에 스키마 작성
@InputType({ isAbstract: true })
@ObjectType()
@Entity() //decorator
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: true })
  @IsBoolean()
  @IsOptional() //IsOptional해당 필드를 보내거나 보내지 않을수 있다는것 뜻함
  isVegan?: boolean;

  @Field((type) => String, { defaultValue: 'eeeeeee' })
  @IsString()
  @Column()
  address: string;
}
