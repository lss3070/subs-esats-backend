import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order, OrderStatus } from '../entities/order.entity';

@InputType()
export class GetMultipleOrdersInput {
  @Field((type) => [OrderStatus], { nullable: true })
  status?: OrderStatus[];
}

@ObjectType()
export class GetMultipleOrdersOutput extends CoreOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
