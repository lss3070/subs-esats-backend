import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class EditOrderInput extends PickType(Order, ['id', 'status']) {
  @Field((type) => Number, { nullable: true })
  deliveryTime?: number;
}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
