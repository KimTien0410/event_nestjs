import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
<<<<<<< Updated upstream
=======
import { UserModule } from './modules/user/user.module'
import { ValidationModule } from './common/validation/validation.module'
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
<<<<<<< Updated upstream
=======
    ValidationModule,
    UserModule,
>>>>>>> Stashed changes
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
