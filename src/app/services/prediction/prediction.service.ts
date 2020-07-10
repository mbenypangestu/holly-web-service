import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prediction } from './prediction.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Prediction)
    private readonly repo: MongoRepository<Prediction>,
  ) {}

  async getAllTemporaldata(): Promise<Prediction[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async getHotelYear(): Promise<any> {
    try {
      return await this.repo.distinct('year', {});
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !\n' + error);
    }
  }

  async getByLocationYearMonth(
    location_name: string,
    year: number,
    month: number,
  ): Promise<Prediction[]> {
    try {
      return await this.repo.find({
        select: [],
        where: {
          'hotel.location.name': { $in: [location_name] },
          year: year,
          month: month,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !\n' + error);
    }
  }

  async getByHotel(hotel_id: string, year: number): Promise<Prediction[]> {
    try {
      return await this.repo.find({
        where: {
          hotel_id: hotel_id,
          year: year,
        },
        order: {
          month: 'ASC',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !\n' + error);
    }
  }

  async getByHotelYearMonth(
    hotel_id: string,
    year: number,
    month: number,
  ): Promise<Prediction> {
    try {
      return await this.repo.findOne({
        where: {
          hotel_id: hotel_id,
          year: year,
          month: month,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !\n' + error);
    }
  }
}
