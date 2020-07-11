import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Location } from './location.entity';
import { LocationService } from './location.service';
import { GetLocation } from './dto/get-location.dto';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('api/v1/location')
@ApiUseTags('location')
export class LocationController {
  constructor(public service: LocationService) {}

  @Get()
  async getAll(): Promise<any> {
    const datas = (await this.service.findAll()).map(
      loc => new GetLocation(loc),
    );
    return Promise.resolve(datas);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Location> {
    const datas = await this.service.findById(id);
    return Promise.resolve(datas);
  }
}
