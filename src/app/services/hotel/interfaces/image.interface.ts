import { ObjectID } from 'typeorm';
import { IContentImage } from './content_image.interface';

export interface IImage {
  readonly small: IContentImage;
  readonly thumbnail: IContentImage;
  readonly original: IContentImage;
  readonly large: IContentImage;
  readonly medium: IContentImage;
}
