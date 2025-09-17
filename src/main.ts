import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'EventManagement-KT:',
    }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api/v1');
  const config = new DocumentBuilder()
    .setTitle('Event Management System')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('api/v1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

   const dataSource = app.get(DataSource);

  addTransactionalDataSource(dataSource);


  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
