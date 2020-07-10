import { Module, HttpModule } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './prediction.entity';

@Module({
  providers: [PredictionService],
  controllers: [PredictionController],
  imports: [
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Prediction]),
  ],
  exports: [PredictionService],
})
export class PredictionModule {}
