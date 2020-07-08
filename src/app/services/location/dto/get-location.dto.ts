import { ObjectIdColumn, Column, Entity, ObjectID } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { ILocation } from '../interfaces/location.interface';

@Entity()
export class GetLocation {
  @ApiModelProperty()
  _id: ObjectID;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  location_id: string;

  constructor(data: ILocation) {
    this._id = data._id;
    this.name = data.name;
    this.location_id = data.location_id;
  }
}
