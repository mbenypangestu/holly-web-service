import { ObjectID } from 'typeorm';
import { Hotel } from '../../hotel/hotel.entity';
import { Location } from '../../location/location.entity';

export interface IPrediction {
  readonly _id: ObjectID;

  readonly location_id: number;
  readonly hotel_id: string;
  readonly month: number;
  readonly year: number;

  readonly rating_rooms: number;
  readonly rating_value: number;
  readonly rating_sleep_quality: number;
  readonly rating_location: number;
  readonly rating_cleanliness: number;
  readonly rating_service: number;

  readonly wordnet: number;
  readonly vader: number;

  readonly cluster: number;
  readonly error_rate: number;
  readonly label: String;

  readonly hotel: Hotel;
  readonly location: Location;
}
