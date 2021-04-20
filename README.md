###sub-eats-backend

3.4 간단정리
이해안될땐 3.3ㄱRecap 다시 보자

전체 흐름: AppModule - TypeOrmModule - RestaurantsModule - RestaurantResolver - RestaurantService

1) TypeOrmModule에 DB로 전송할 entity들 설정

2) RestaurantsModule
: TypeOrmModule의 Restaurant 엔티티를 다른 곳에서 Inject할 수 있도록 import하기.
: providers에 RestaurantService 주입 => RestaurantResolver에서 사용 가능.

3) RestaurantService
: @InjectReposity(entity): 전달받은 entity를 기반으로 Repository 생성.
: Repository의 메서드들로 DB에 접근하는 방식 지정.

4) RestaurantResolver
: GraphQL Query/Mutation으로 DB에 접근하는 RestaurantService의 메서드들 활용.



5.11 recap
header에 X-JWT란 토큰을 보냄
그것을 사용하기 위해 middleware에서 jwtService.veriry()를 이용해서 id를 찾음
그럼 userservice를 사용해서 해당 id를 가진 user를 찾음
그러고 db에서 user를 찾게되면 reuquest반환함

app module에서 context는 아폴로에서나 모든 resolver에서 데이터를 보낼수 있는 프로퍼티이다.


5.16 recap


## User Entity:

- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

## Unit test
- 7.4,8,9.2ing...

## the backend of suber eats clone
- See Categories
- See Restaurants by Category(pagination)
- See Restaurants (pagination)
- See Restaurant

- Edit Restaurant
- Delete Restaurant

- Creatre Dish
- Edit Dish
- Delete Dish