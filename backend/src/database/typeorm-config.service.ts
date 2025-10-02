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
          type: 'postgres',
          dropSchema: false,
          keepConnectionAlive: true,
          namingStrategy: new SnakeNamingStrategy(),
          entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          synchronize: false,
          ...this.configService.dbConfig,
        } as TypeOrmModuleOptions;
    }
}
