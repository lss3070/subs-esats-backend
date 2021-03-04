import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entitities/restaurant.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
