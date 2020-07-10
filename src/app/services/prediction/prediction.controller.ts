import { Controller, Get, Query } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { Prediction } from './prediction.entity';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('api/v1/prediction')
@ApiUseTags('prediction')
export class PredictionController {
  constructor(public service: PredictionService) {}

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
  ): Promise<Prediction[]> {
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

  @Get('/getby_hotel_year')
  async getByHotelYear(
    @Query('hotel_id') hotel_id: string,
    @Query('year') year: string,
  ): Promise<Prediction[]> {
    var year_num = parseInt(year);
    const datas = await this.service.getByHotel(hotel_id, year_num);
    return await Promise.resolve(datas);
  }

  @Get('/getby_hotel_year_month')
  async getByHotelYearMonth(
    @Query('hotel_id') hotel_id: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ): Promise<Prediction> {
    var year_num = parseInt(year);
    var month_num = parseInt(month);

    const datas = await this.service.getByHotelYearMonth(
      hotel_id,
      year_num,
      month_num,
    );
    return await Promise.resolve(datas);
  }
}
