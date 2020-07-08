import { Injectable, BadRequestException } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository, ObjectID } from 'typeorm';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { Hotel } from '../hotel/hotel.entity';
import { CreateReviewDto } from './dto/create-review.dto';

import { KafkaClient as Client, Producer, ProduceRequest } from 'kafka-node';
import { KafkaService } from '../kafka/kafka.service';
const kafkaHost = 'localhost:9092';

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'hotelaja',
  brokers: ['localhost:9092'],
  connectionTimeout: 1000,
  requestTimeout: 1000,
  // maxInFlightRequests: 200,
  // retry: {
  //   initialRetryTime: 1000,
  //   retries: 5,
  // },
});
const producer = kafka.producer({ groupId: 'hotel-group' });

@Injectable()
export class ReviewService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Review) private readonly repo: Repository<Review>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    try {
      const save = await this.repo.save(dto);

      if (save) {
        console.log(
          '[ ' +
            Date().toString() +
            ' ] Saved ! Review ' +
            dto.id +
            ' - ' +
            dto.title,
        );
        return save;
      }
    } catch (error) {
      console.log(
        '[ ' +
          Date().toString() +
          ' ] Failed to save review with review id: ' +
          dto.id,
      );
      console.log(error + '\n');
      throw new BadRequestException(
        '[ ' + Date.now() + ' ] Failed to save data !',
      );
    }
  }

  async isReviewExist(review_id: string) {
    try {
      const data = await this.repo.findOne({
        where: { id: review_id },
      });

      if (data === undefined) return false;
      else return true;
    } catch (error) {
      throw new BadRequestException('Failed to get data review !');
    }
  }

  async getReviewsByLocationId(location_id: string): Promise<Review[]> {
    try {
      const data = await this.repo.find({
        where: { location_id: location_id },
      });

      if (data !== undefined) return data;
      else return null;
    } catch (error) {
      throw new BadRequestException('Failed to get data review !');
    }
  }

  async deleteManyByHotelLocationId(hotel_location_id: string): Promise<any> {
    try {
      const data = await this.repo.delete({ location_id: hotel_location_id });

      if (data) {
        console.log(
          '----> Delete Success from hotel id : ' +
            hotel_location_id +
            ' !\n----> Recreating...',
        );
      } else {
        console.log(
          'Err : Delete Failed from hotel id : ' + hotel_location_id + ' !\n',
        );
      }
    } catch (error) {
      throw new BadRequestException('Failed to get data review !');
    }
  }

  async createMany(hotel: Hotel): Promise<any> {
    const hotel_locationID = hotel.location_id;
    const hotel_ObjectId = hotel._id;

    let url = URL_HOTELS_BY_LOCATION + hotel.location_id + '/reviews';
    let next = false;
    let reviews_from_db;

    try {
      let reviews_from_db = await this.getReviewsByLocationId(hotel_locationID);

      do {
        try {
          let response = await this.apiService.grabReviewByHotelLocationId(
            url,
            hotel,
          );
          const reviews = response.data;
          const paging = response.paging;

          await Promise.all(
            reviews.map(async review => {
              let date_now: Date = new Date();
              let is_review_exist = await reviews_from_db.some(
                r => r.id == review.id,
              );

              if (!is_review_exist) {
                const reviewCreate = {
                  ...review,
                  hotel: hotel,
                  hotel_locationID: hotel_locationID,
                  hotel_ObjectId: hotel_ObjectId,
                  created_at: date_now,
                };
                await this.create(reviewCreate);
                // await KafkaService.produce('reviews', reviewCreate);
              } else {
                console.log(
                  '[ ' +
                    Date().toString() +
                    ' ] Review (' +
                    review.id +
                    ') is already exist !\n',
                );
              }
            }),
          );

          if (paging.next != null) {
            next = true;
            url = paging.next;
          } else next = false;
        } catch (error) {
          console.log('Failed to save review from hotel : ' + hotel.name);
          console.log(error + '\n');
          break;
        }
      } while (next);
    } catch (error) {
      console.log('Failed Get review from hotel : ' + hotel.name);
      console.log(error + '\n');
    }
  }
}
