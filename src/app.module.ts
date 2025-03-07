import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthorizationModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { Category } from './restaurants/entitities/category.entity';
import { Restaurant } from './restaurants/entitities/restaurant.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Dish } from './restaurants/entitities/dish.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { CommonModule } from './common/common.module';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadsModule } from './uploads/uploads.module';
import { DishDivision } from './restaurants/entitities/dish-division';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(), //Joi는 환경변수 유효성검사
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      //heroku에서 계속 동적으로 config값이 바뀌어서 url링크로 대체
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),

      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test', //DB에서 돌아가는 로그 체크
      entities: [
        User,
        Verification,
        Restaurant,
        Category,
        Dish,
        Order,
        OrderItem,
        DishDivision,
        Payment,
      ], //DB설정 DB는 Restaurant
    }),
    GraphQLModule.forRoot({
      playground: true,
      introspection: true,
      // playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true, //서버에서 웹소켓 기능을 가지게됨
      autoSchemaFile: true, //설정값이 정해져있으면 dynamic module
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        };
      }, //request받은 user데이터를 공유하는것... context 매  res마다 호출되는것..
    }),
    ScheduleModule.forRoot(),
    // RestaurantsModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    UsersModule, //아무것도 정의되지 않은 얘들은 static module
    // CommonModule,
    AuthorizationModule,
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    AuthorizationModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    CommonModule,
    PaymentsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'graphql', method: RequestMethod.POST });
  }
}
