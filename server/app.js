require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const users = require('./routes/users');
const main = require('./routes/main');
const myroutine = require('./routes/myroutine');
const PORT = 8080;
const app = express();

const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})


app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/main', main);
app.use('/myroutine', myroutine);

app.listen(PORT, () => {
  console.log(`server on ${PORT}`)
});

module.exports = app;