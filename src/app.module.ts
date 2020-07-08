import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './app/services/hotel/hotel.module';
import { LocationModule } from './app/services/location/location.module';
import { join } from 'path';
import { DatabaseModule } from './app/config/database/database.module';
import { ConfigModule, ConfigService } from 'nestjs-dotenv';
import { HotelService } from './app/services/hotel/hotel.service';
import { LocationService } from './app/services/location/location.service';
import { Location } from './app/services/location/location.entity';
import { ScheduleModule } from 'nest-schedule';
import { ApiModule } from './app/services/api/api.module';
import { ReviewModule } from './app/services/review/review.module';
import { KafkaModule } from './app/services/kafka/kafka.module';
import { KafkaService } from './app/services/kafka/kafka.service';
import { TemporaldataModule } from './app/services/temporaldata/temporaldata.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'holly_production',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TypeOrmModule.forFeature([Location]),
    ScheduleModule.register(),
    HotelModule,
    LocationModule,
    DatabaseModule,
    ApiModule,
    ReviewModule,
    KafkaModule,
    TemporaldataModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocationService, KafkaService],
  exports: [LocationService],
})
export class AppModule {}
