import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';
dotenv.config();

type Config = {
  username : string,
  password : string,
  port : any,
  database : string,
  host : string,
  dialect : Dialect,
  timezone : string
};

interface IConfigGroup {
  development : Config,
  test : Config,
  production : Config
};

const config : IConfigGroup = {
  development: {
    username: 'root',
    password: process.env.DB_DEV_PASSWORD!,
    port : '3306',
    database: 'ptathome',
    host: '127.0.0.1',
    dialect: 'mariadb',
    timezone: '+09:00',
  },
  test: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    port : process.env.DB_PORT,
    database: 'ptathome',
    host: '127.0.0.1',
    dialect: 'mariadb',
    timezone: '+09:00',
  },
  production: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    port : process.env.DB_PORT,
    database: 'ptathome',
    host: 'savemehomtdb.caigvf4pbegf.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    timezone: '+09:00',
  }
};

export default config;