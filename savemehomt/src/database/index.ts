import { userInfo } from 'os';
import {Sequelize} from 'sequelize';
import config from '../config';
import image  from '../models/image.model';
import parts  from '../models/parts.model';
import workouts from '../models/workouts.model';
import workout_parts  from '../models/workout_parts.model';
import users from '../models/users.model'

// const env = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
  host: config[env].host,
  dialect: config[env].dialect,
  timezone: '+09:00',
  pool: config[env].pool,
  // logQueryParameters: env === 'development',
  logQueryParameters: env === 'test',
  benchmark: true,
});


const DB = {
  parts : parts(sequelize),
  workout_parts : workout_parts(sequelize),
  image : image(sequelize),
  workouts: workouts(sequelize),
  users: users(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;