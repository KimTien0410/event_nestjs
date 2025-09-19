import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { DataSource } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { IcsModule } from './modules/ics/ics.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/modules/**/entities/*.entity.{js,ts}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    UserModule,
    EventModule,
    AttendanceModule,
    IcsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}
