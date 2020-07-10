import {
  ObjectIdColumn,
  Column,
  Entity,
  ObjectID,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Hotel } from '../hotel/hotel.entity';
import { Type } from 'class-transformer';
import { type } from 'os';
import { IPrediction } from './interfaces/predicion.interface';
import { Location } from '../location/location.entity';

@Entity({ name: 'prediction' })
export class Prediction implements IPrediction {
  @ObjectIdColumn() _id: ObjectID;

  @Column() location_id: number;
  @Column() hotel_id: string;
  @Column() month: number;
  @Column() year: number;

  @Column() rating_rooms: number;
  @Column() rating_value: number;
  @Column() rating_sleep_quality: number;
  @Column() rating_location: number;
  @Column() rating_cleanliness: number;
  @Column() rating_service: number;

  @Column() wordnet: number;
  @Column() vader: number;

  @Column() cluster: number;
  @Column() error_rate: number;
  @Column() label: String;

  @ManyToOne(type => Hotel, hotel => hotel.tempdata)
  @Column(type => Hotel)
  hotel: Hotel;

  @ManyToOne(type => Location, location => location._id)
  @Column(type => Location)
  location: Location;

  @Column() created_at: Date;
}
