import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';

import {SnakeNamingStrategy} from '../configuration/snake-naming.strategy';
import {ApiConfigService} from '../shared/services/api-config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ApiConfigService) {
    }
    
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
          type: process.env.DB_TYPE,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT
            ? Number.parseInt(process.env.DB_PORT, 10)
            : 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          namingStrategy: new SnakeNamingStrategy(),
          logging: true,
          entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          synchronize: false,
        } as TypeOrmModuleOptions;
    }
}
