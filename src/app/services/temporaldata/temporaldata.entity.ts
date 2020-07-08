import {
  ObjectIdColumn,
  Column,
  Entity,
  ObjectID,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ITemporaldata } from './interfaces/temporaldata.interface';
import { Hotel } from '../hotel/hotel.entity';
import { Type } from 'class-transformer';
import { type } from 'os';

@Entity({ name: 'temporal_data' })
export class Temporaldata implements ITemporaldata {
  @ObjectIdColumn() _id: ObjectID;

  @Column() name: string;

  @Column() hotel_id: string;
  @Column() month: number;
  @Column() year: number;
  @Column() location_id: number;

  @Column() rating_rooms: number;
  @Column() rating_value: number;
  @Column() rating_sleep_quality: number;
  @Column() rating_location: number;
  @Column() rating_cleanliness: number;
  @Column() rating_service: number;

  @Column() wordnet_score: number;
  @Column() vader_neg_score: number;
  @Column() vader_pos_score: number;
  @Column() vader_neu_score: number;
  @Column() vader_compound_score: number;

  @Column() cluster: number;
  @Column() error_rate: number;
  @Column() label: String;

  @ManyToOne(type => Hotel, hotel => hotel.tempdata)
  @Column(type => Hotel)
  hotel: Hotel;

  @Column() created_at: Date;
}
