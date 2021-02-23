require('dotenv').config();

const DATABASE_SECRET = process.env.DATABASE_SECRET

const dbConfig = {
  development: {
    username: 'savemehome',
    password: DATABASE_SECRET,
    database: 'ptathome',
    host: 'databaseptathome.caigvf4pbegf.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'sequelize',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
};

export default dbConfig;
