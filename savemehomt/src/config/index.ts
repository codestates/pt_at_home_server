const dbConfig = {
  development: {
    username: 'root',
    password: 'wkdalsdn1!A',
    database: 'ptathome',
    host: '127.0.0.1',
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
