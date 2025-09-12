import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('Entity path:', __dirname + '/../modules/**/entities/*.entity.{ts,js}');

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [__dirname + '/../modules/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
