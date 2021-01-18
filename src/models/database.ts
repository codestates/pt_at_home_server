import {Sequelize} from 'sequelize';

import config from '../config/config';

const {database, username, password} = config.development;

const sequelize = new Sequelize(database, username, password, config.development);

export {sequelize};
export default sequelize;


