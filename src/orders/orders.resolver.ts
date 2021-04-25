import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorator';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { PUB_SUB } from '../common/commonconstants';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(
    private readonly OrdersService: OrdersService,
    @Inject(PUB_SUB)
    private readonly pubSub: PubSub,
  ) {}

  @Mutation((returns) => CreateOrderOutput)
  async createOrder(
    @AuthUser() customer: User,
    @Args('input')
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.OrdersService.createOrder(customer, createOrderInput);
  }
  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.OrdersService.getOrders(user, getOrdersInput);
  }

  @Query((returns) => GetOrderOutput)
  @Role(['Any'])
  async getOrder(
    @AuthUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.OrdersService.getOrder(user, getOrderInput);
  }

  @Mutation((returns) => EditOrderOutput)
  @Role(['Any'])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.OrdersService.editOrder(user, editOrderInput);
  }

  @Mutation((returns) => Boolean)
  async summerReady(@Args('summerId') summerId: number) {
    await this.pubSub.publish('hotSummer', {
      readySummer: summerId,
    });
    return true;
  }

  @Subscription((returns) => String, {
    filter: ({ readySummer }, { summerId }) => {
      return readySummer === summerId;
    },
  })
  @Role(['Any'])
  readySummer(@Args('summerId') summerId: number) {
    return this.pubSub.asyncIterator('hotSummer');
  }
}
