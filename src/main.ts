import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerBaseConfig = new DocumentBuilder()
    .setTitle('Wikihotel - TripAdvisor Scraper & Apify Parser')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerBaseConfig);
  SwaggerModule.setup('api/v1', app, swaggerDocument);

  app.enableCors();

  await app.listen(8001);
}
bootstrap();
