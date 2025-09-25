import 'reflect-metadata';

import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


import { SnakeNamingStrategy } from '../configuration/snake-naming.strategy';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions);
