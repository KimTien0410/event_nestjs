import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { json, urlencoded } from 'express';
import { configureSwagger } from './configuration/config-swagger';
import { configLogging } from './configuration/config-logging';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'EventManagement-KT:',
    }),
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const configService = app.select(SharedModule).get(ApiConfigService);

  configureSwagger(app, configService);
  configLogging(app, configService);

  const dataSource = app.get(DataSource);
  addTransactionalDataSource(dataSource);

  await app.listen(configService.serverPort);
}
void bootstrap();

