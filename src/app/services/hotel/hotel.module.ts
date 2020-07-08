import { Module, HttpService, HttpModule } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { LocationService } from '../location/location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../location/location.entity';
import { Hotel } from './hotel.entity';
import { ApiService } from '../api/api.service';
import { Review } from '../review/review.entity';
import { ReviewService } from '../review/review.service';
import { KafkaService } from '../kafka/kafka.service';

@Module({
  providers: [HotelService, ApiService, ReviewService, LocationService],
  controllers: [HotelController],
  imports: [
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Hotel, Review, Location]),
  ],
  exports: [HotelService, ApiService, ReviewService, LocationService],
})
export class HotelModule {}
