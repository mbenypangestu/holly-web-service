import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  imports: [TypeOrmModule.forFeature([Location])],
  exports: [LocationService],
})
export class LocationModule {}
