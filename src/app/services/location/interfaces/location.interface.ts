import { ObjectID } from 'typeorm';

export interface ILocation {
  readonly _id: ObjectID;

  readonly name: string;
  readonly location_id: string;
}
