import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { LocationService } from './app/services/location/location.service';
import { HotelService } from './app/services/hotel/hotel.service';
import { async } from 'rxjs/internal/scheduler/async';
import { KafkaService } from './app/services/kafka/kafka.service';

@Injectable()
export class AppService extends NestSchedule {
  constructor(
    private readonly locationService: LocationService,
    private readonly hotelService: HotelService,
    private readonly kafkaService: KafkaService,
  ) {
    super();
  }
}
