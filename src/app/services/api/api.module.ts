import { Module, HttpModule } from '@nestjs/common';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from '../hotel/hotel.entity';

@Module({
  providers: [ApiService],
  imports: [
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
  ],
  exports: [ApiService],
})
export class ApiModule {}
