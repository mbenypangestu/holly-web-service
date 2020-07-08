import {
  Controller,
  Post,
  Body,
  Get,
  HttpService,
  Res,
  Param,
  Query,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { ApiService } from '../api/api.service';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { LocationService } from '../location/location.service';

@Controller('api/v1/hotel')
@ApiUseTags('hotel')
export class HotelController {
  constructor(private readonly service: HotelService) {}

  @Post()
  async create(@Body() dto: CreateHotelDto) {
    this.service.create(dto);
  }

  @Get('/:id')
  async getHotelId(@Param('id') id: string) {
    const data = await this.service.getHotelByLocHotelID(id);
    return data;
  }

  @Get('/getby-location/:location_id')
  async getHotelsByLocationId(
    @Param('location_id') location_id: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    let limit_int = parseInt(limit);
    let page_int = parseInt(page);
    limit_int = limit_int > 10 ? 10 : limit_int;

    return await this.service.paginate(
      {
        page: page_int,
        limit: limit_int,
        route: 'http://localhost:8000/hotel/' + location_id,
      },
      location_id,
    );
  }

  @Get('/crawl')
  async crawlHotelByLocId(): Promise<any> {
    return this.service.crawlHotel();
  }
}
