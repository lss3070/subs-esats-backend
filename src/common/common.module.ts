import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './commonconstants';

const pubsub = new PubSub();
//서버가 여러개일 경우 graphql-redis-subscriptions를 사용!!
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [PUB_SUB],
})
@Global()
export class CommonModule {}
