import { ObjectID } from 'typeorm';
import { Hotel } from '../../hotel/hotel.entity';

export interface ITemporaldata {
  readonly _id: ObjectID;

  readonly hotel_id: string;
  readonly month: number;
  readonly year: number;
  readonly location_id: number;

  readonly rating_rooms: number;
  readonly rating_value: number;
  readonly rating_sleep_quality: number;
  readonly rating_location: number;
  readonly rating_cleanliness: number;
  readonly rating_service: number;

  readonly wordnet_score: number;
  readonly vader_neg_score: number;
  readonly vader_pos_score: number;
  readonly vader_neu_score: number;
  readonly vader_compound_score: number;

  readonly cluster: number;
  readonly error_rate: number;
  readonly label: String;

  readonly hotel: Hotel;

  readonly created_at: Date;
}
