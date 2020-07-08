import { Module, HttpModule } from '@nestjs/common';
import { TemporaldataService } from './temporaldata.service';
import { TemporaldataController } from './temporaldata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temporaldata } from './temporaldata.entity';

@Module({
  providers: [TemporaldataService],
  controllers: [TemporaldataController],
  imports: [
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Temporaldata]),
  ],
  exports: [TemporaldataService],
})
export class TemporaldataModule {}
