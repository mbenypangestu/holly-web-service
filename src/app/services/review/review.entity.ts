import { ObjectIdColumn, Column, Entity, ObjectID, ManyToOne } from 'typeorm';
import { Location } from '../location/location.entity';
import { IReview } from './interfaces/review.interface';
import { Hotel } from '../hotel/hotel.entity';

@Entity({ name: 'review' })
export class Review implements IReview {
  @ObjectIdColumn() _id: ObjectID;

  @Column() id: string;

  @Column() lang: string;

  @Column() location_id: string;

  @Column() published_date: string;

  @Column() rating: string;

  @Column() helpful_votes: string;

  @Column() url: string;

  @Column() travel_date: string;

  @Column() text: string;

  @Column() title: string;

  @ObjectIdColumn() hotelID: ObjectID;

  @Column({ type: 'datetime' }) created_at: Date;

  @ManyToOne(type => Hotel, hotel => hotel.reviews)
  hotel: Hotel;
}
