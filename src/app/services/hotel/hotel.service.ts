import {
  Injectable,
  Inject,
  HttpService,
  BadRequestException,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository, ObjectID } from 'typeorm';
import { IHotel } from './interfaces/hotel.interface';
import { Location } from '../location/location.entity';
import { ApiService } from '../api/api.service';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { ReviewService } from '../review/review.service';
import { LocationService } from '../location/location.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class HotelService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Hotel) private readonly repo: Repository<Hotel>,
    private readonly reviewService: ReviewService,
    private readonly locationService: LocationService,
  ) {}

  async paginate(
    options: IPaginationOptions,
    location_id: string,
  ): Promise<Pagination<Hotel>> {
    return paginate<Hotel>(this.repo, options, {
      where: {
        locationID: parseInt(location_id),
      },
    });
  }

  async getAllHotel(): Promise<Hotel[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async getHotelLimit(): Promise<Hotel[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async getHotelsByLocationId(location_id: string): Promise<Hotel[]> {
    try {
      return await this.repo.find({
        where: { locationID: parseInt(location_id) },
      });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async getHotelByLocHotelID(loc_hotel_id: string): Promise<Hotel> {
    try {
      return await this.repo.findOne({ where: { location_id: loc_hotel_id } });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async isHotelExist(loc_hotel_id: string) {
    try {
      const data = await this.repo.findOne({
        where: { location_id: loc_hotel_id },
      });

      if (data === undefined) return false;
      else return true;
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async create(dto: CreateHotelDto): Promise<Hotel> {
    try {
      const save = await this.repo.save(dto);

      if (save) {
        console.log('--> Saved, Hotel (' + dto.location_id + ') - ' + dto.name);
        return save;
      }
    } catch (error) {
      console.log(
        'Err : Failed to save hotel with loc hotel id : ' + dto.location_id,
      );
      console.log(error + '\n');
      throw new BadRequestException('Failed to save data !');
    }
  }

  async update(hotel_location_id: string, dto: UpdateHotelDto): Promise<any> {
    try {
      const update = await this.repo.update(
        {
          location_id: hotel_location_id,
        },
        dto,
      );

      if (update) {
        console.log('--> Updated, Hotel (' + hotel_location_id + ')');
        return update;
      }
    } catch (error) {
      console.log(
        'Err : Failed to update hotel with loc hotel id : ' + dto.location_id,
      );
      console.log(error + '\n');
      throw new BadRequestException('Failed to update data !');
    }
  }

  async getHotelSaveReview(loc: Location): Promise<any> {
    const locationID = loc.location_id;
    const hotels = await this.getHotelsByLocationId(locationID);

    await Promise.all(
      hotels.map(async hotel => {
        await this.reviewService.createMany(hotel);
      }),
    );
  }

  async createMany(loc: Location): Promise<any> {
    const locationID = loc.location_id;
    const locationObjectID = loc._id;

    let url = URL_HOTELS_BY_LOCATION + loc.location_id + '/hotels';
    let next = false;

    do {
      try {
        let response = await this.apiService.grabHotelByLocation(url, loc);
        const hotels = response.data;
        const paging = response.paging;

        await Promise.all(
          hotels.map(async hotel => {
            let is_hotel_exist = await this.isHotelExist(hotel.location_id);
            let date_now: Date = new Date();

            if (!is_hotel_exist) {
              const hotelCreate = {
                ...hotel,
                location: loc,
                locationID: locationID,
                locationObjectID: locationObjectID,
                created_at: date_now,
              };
              await this.create(hotelCreate);

              const hotelByLocHotelId = await this.getHotelByLocHotelID(
                hotelCreate.location_id,
              );
              await this.reviewService.createMany(hotelByLocHotelId);
            } else
              console.log(
                '[ ' +
                  Date.now() +
                  ' ] Hotel = ' +
                  hotel.name +
                  ' is already exist !',
              );
          }),
        );

        if (paging.next != null) {
          next = true;
          url = paging.next;
        } else next = false;
      } catch (error) {
        console.log(
          '[ ' +
            Date.now() +
            ' ] Failed to save hotel from location ID : ' +
            locationID,
        );
        console.log(error + '\n');
        break;
      }
    } while (next);
  }

  async createManyWithoutReview(loc: Location): Promise<any> {
    const locationID = loc.location_id;
    const locationObjectID = loc._id;

    console.log('[ ' + Date().toString() + ']  Hotel from : ' + loc.name);

    let url = URL_HOTELS_BY_LOCATION + loc.location_id + '/hotels';
    let next = false;

    do {
      try {
        let response = await this.apiService.grabHotelByLocation(url, loc);
        const hotels = response.data;
        const paging = response.paging;

        await Promise.all(
          hotels.map(async hotel => {
            let is_hotel_exist = await this.isHotelExist(hotel.location_id);
            let date_now: Date = new Date();

            if (!is_hotel_exist) {
              const hotelCreate = {
                ...hotel,
                location: loc,
                locationID: locationID,
                locationObjectID: locationObjectID,
                created_at: date_now,
              };
              await this.create(hotelCreate);
            } else {
              console.log(
                '[ ' +
                  Date().toString() +
                  ' ] Hotel  ( ' +
                  hotel.name +
                  ' ) is already exist !',
              );

              // const hotelUpdate = {
              //   location: loc,
              // };
              // await this.update(hotel.location_id, hotelUpdate);
            }
          }),
        );

        if (paging.next != null) {
          next = true;
          url = paging.next;
        } else next = false;
      } catch (error) {
        console.log(
          '[ ' +
            Date().toString() +
            '] Failed to save hotel from location ID : ' +
            locationID,
        );
        console.log(error + '\n');
        break;
      }
    } while (next);
  }

  async crawlHotel(): Promise<Location[]> {
    console.log('=============== Start Crawling Hotel List ===============');
    const locs = await this.locationService.findAll();
    console.log(locs);
    return locs;

    // let i = 0;
    // const waitFor = ms => new Promise(r => setTimeout(r, ms));
    // const asyncForEach = async (index, array, callback) => {
    //   for (index = 0; index < array.length; index++) {
    //     await callback(array[index], index, array);
    //   }
    // };

    // const saveHotels = async () => {
    //   await asyncForEach(i, locs, async loc => {
    //     await waitFor(1);

    //     await this.createManyWithoutReview(loc);
    //   });
    // };
    // await saveHotels();
  }
}
