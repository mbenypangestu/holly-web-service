import { ObjectIdColumn, Column, Entity, ObjectID, OneToMany } from 'typeorm';
import { ILocation } from './interfaces/location.interface';
import { Hotel } from '../hotel/hotel.entity';

@Entity({ name: 'location' })
export class Location implements ILocation {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  location_id: string;

  @OneToMany(type => Hotel, hotel => hotel.location)
  hotels: Hotel[];
}
