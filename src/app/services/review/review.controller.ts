import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiService } from '../api/api.service';
import { HotelService } from '../hotel/hotel.service';

@Controller('api/v1/spider/review')
export class ReviewController {
  constructor(
    private readonly service: ReviewService,
    private readonly hotelService: HotelService,
  ) {}

  @Get('test')
  async getReview() {
    const hotel = await this.hotelService.getHotelByLocHotelID('12853007');
    const data = await this.service.createMany(hotel);
  }
}
