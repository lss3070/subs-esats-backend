import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((type) => {
    return String;
  })
  name: string;
  @Field((type) => Boolean, { nullable: true })
  isVegan?: boolean;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  ownerName: string;
}
