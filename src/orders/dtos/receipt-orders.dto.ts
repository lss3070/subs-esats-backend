import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class ReceiptOrderInput extends PickType(Order, [
  'id',
  'status',
  'deliveryTime',
]) {}
@ObjectType()
export class ReceiptOrderOutput extends CoreOutput {}
