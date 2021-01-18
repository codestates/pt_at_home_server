const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const users = require('./routes/users');
const main = require('./routes/main');
const myroutine = require('./routes/myroutine');

const app = express();

const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/main', main);
app.use('/myroutine', myroutine);


app.listen(8080);

module.exports = app;
