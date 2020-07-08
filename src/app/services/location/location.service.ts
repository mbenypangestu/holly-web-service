import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Any } from 'typeorm';
import { Location } from './location.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private readonly repo: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    try {
      return await this.repo.find({});
    } catch (error) {
      throw new BadRequestException('Failed to get data location !');
    }
  }
  async findIndonesia(): Promise<Location[]> {
    try {
      return await this.repo.find({
        where: {
          $or: [
            { name: 'Surabaya' },
            { name: 'Medan' },
            { name: 'Banda Aceh' },
            { name: 'Padang' },
            { name: 'Pekanbaru' },
            { name: 'Palembang' },
            { name: 'Bengkulu' },
            { name: 'Bandar Lampung' },
            { name: 'Pangkal Pinang' },
            { name: 'Tanjung Pinang' },
            { name: 'Jakarta' },
            { name: 'Bandung' },
            { name: 'Semarang' },
            { name: 'Yogyakarta' },
            { name: 'Serang' },
            { name: 'Denpasar' },
            { name: 'Mataram' },
            { name: 'Kupang' },
            { name: 'Pontianak' },
            { name: 'Banjarmasin' },
            { name: 'Samarinda' },
            { name: 'Manado' },
            { name: 'Palu' },
            { name: 'Makassar' },
            { name: 'Kendari' },
            { name: 'Gorontalo' },
            { name: 'Mamuju' },
            { name: 'Ambon' },
            { name: 'Jayapura' },
            { name: 'Manokwari' },
            { name: 'Malang' },
            { name: 'Sidoarjo' },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException(error + ', Failed to get data location !');
    }
  }
}
