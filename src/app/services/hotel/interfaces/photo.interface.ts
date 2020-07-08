import { ObjectID } from 'typeorm';
import { Location } from '../../location/location.entity';
import { IImage } from './image.interface';

export interface IPhoto {
  readonly caption: string;
  readonly images: IImage[];
}
