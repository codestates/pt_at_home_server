import { Sequelize } from 'sequelize';
import config from '../config/index';
import * as dotenv from 'dotenv';
dotenv.config();


const env = process.env.NODE_ENV as 
('development' | 'test' |'production') || 'development';

const { database, username, password } = config[env];

const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;