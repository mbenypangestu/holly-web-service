import { Injectable, BadRequestException } from '@nestjs/common';
import { Temporaldata } from './temporaldata.entity';
import { Repository, MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTemporaldataDto } from './dto/get-temporaldata.dto';

@Injectable()
export class TemporaldataService {
  constructor(
    @InjectRepository(Temporaldata)
    private readonly repo: MongoRepository<Temporaldata>,
  ) {}

  async getAllTemporaldata(): Promise<Temporaldata[]> {
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
  ): Promise<Temporaldata[]> {
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

  async getByHotel(hotel_id: string, year: number): Promise<Temporaldata[]> {
    try {
      return await this.repo.find({
        where: {
          hotel_id: hotel_id,
          year: year,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !\n' + error);
    }
  }

  async getRelatedHotel(
    location_id: number,
    year: number,
    month: number,
  ): Promise<Temporaldata[]> {
    try {
      return await this.repo.find({
        where: {
          location_id: location_id,
          year: year,
          month: month,
        },
        take: 5,
      });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !\n' + error);
    }
  }
}
