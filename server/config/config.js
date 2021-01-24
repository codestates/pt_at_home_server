require('dotenv').config();

module.exports = {
  development: {
    username: "savemehome",
    password: process.env.DATABASE_SECRET,
    database: "ptathome",
    host: "databaseptathome.caigvf4pbegf.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.DATABASE_SECRET,
    database: "ptathome",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "savemehome",
    password: process.env.DATABASE_SECRET,
    database: "ptathome",
    host: "databaseptathome.caigvf4pbegf.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql"
  }
}