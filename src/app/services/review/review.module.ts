import { Module, HttpModule } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ApiService } from '../api/api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { HotelService } from '../hotel/hotel.service';
import { Hotel } from '../hotel/hotel.entity';
import { KafkaService } from '../kafka/kafka.service';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location.entity';

@Module({
  providers: [
    ReviewService,
    ApiService,
    HotelService,
    KafkaService,
    LocationService,
  ],
  controllers: [ReviewController],
  imports: [
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Review, Hotel, Location]),
  ],
  exports: [
    ReviewService,
    ApiService,
    HotelService,
    KafkaService,
    LocationService,
  ],
})
export class ReviewModule {}
