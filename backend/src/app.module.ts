import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { DataSource } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { IcsModule } from './modules/ics/ics.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './decorator/jwt-auth-guard';
import { LoggingExceptionFilter } from './filter/error-handling-exception-filter';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { SnakeNamingStrategy } from './configuration/snake-naming.strategy';
import { Type } from 'class-transformer';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { GoogleCalendarModule } from './modules/google-calendar/google-calendar.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    AuthModule,
    UserModule,
    KeycloakModule,
    EventModule,
    AttendanceModule,
    IcsModule,
    GoogleCalendarModule,
  ],

  providers: [
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}
