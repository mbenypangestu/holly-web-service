import { Controller, Get, Param, Query, Body } from '@nestjs/common';
import { TemporaldataService } from './temporaldata.service';
import { GetTemporaldataDto } from './dto/get-temporaldata.dto';
import { Temporaldata } from './temporaldata.entity';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('api/v1/temporaldata')
@ApiUseTags('temporaldata')
export class TemporaldataController {
  constructor(public service: TemporaldataService) {}

  @Get('/getyear')
  async getAll(): Promise<any> {
    const datas = await this.service.getHotelYear();
    return Promise.resolve(datas.slice(0).sort((a, b) => b - a));
  }

  @Get('/getby_location_date')
  async getByLocation(
    @Query('location_name') location_name: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ): Promise<Temporaldata[]> {
    var year_num = parseInt(year);
    var month_num = parseInt(month);

    var location_pascal = location_name.replace(/(\w)(\w*)/g, function(
      g0,
      g1,
      g2,
    ) {
      return g1.toUpperCase() + g2.toLowerCase();
    });

    const datas = await this.service.getByLocationYearMonth(
      location_pascal,
      year_num,
      month_num,
    );
    return await Promise.resolve(datas);
  }

  @Get('/getby_hotel')
  async getByHotel(
    @Query('hotel_id') hotel_id: string,
    @Query('year') year: string,
  ): Promise<Temporaldata[]> {
    var year_num = parseInt(year);
    const datas = await this.service.getByHotel(hotel_id, year_num);
    return await Promise.resolve(datas);
  }

  @Get('/get_related_hotel')
  async getRelated(
    @Query('location_id') location_id: string,
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('cluster') cluster: string,
  ): Promise<Temporaldata[]> {
    var year_num = parseInt(year);
    var month_num = parseInt(month);
    var location_id_num = parseInt(location_id);
    var cluster_num = parseInt(cluster);

    const datas = await this.service.getRelatedHotel(
      location_id_num,
      year_num,
      month_num,
      cluster_num,
    );
    return await Promise.resolve(datas);
  }
}
