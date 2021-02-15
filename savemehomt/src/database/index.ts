import Sequelize from 'sequelize';
import config from '../config';
import image  from '../models/image.model';
import parts  from '../models/parts.model';
import workouts from '../models/workout.model';
import workout_part  from '../models/workout_part.model';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize.Sequelize(config[env].database, config[env].username, config[env].password, {
  host: config[env].host,
  dialect: config[env].dialect,
  timezone: '+09:00',
  pool: config[env].pool,
  logQueryParameters: env === 'development',
  benchmark: true,
});


const DB = {
  parts : parts(sequelize),
  workout_part : workout_part(sequelize),
  image : image(sequelize),
  workouts: workouts(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
