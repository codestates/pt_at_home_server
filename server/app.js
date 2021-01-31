require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session')

const users = require('./routes/users');
const main = require('./routes/main');
const myroutine = require('./routes/myroutine');
const PORT = 8080;
const app = express();

const models = require("./models/index.js");

models.sequelize.sync().then(() => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      path: '/',
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 60000 * 60,
    }
  })
)


app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://savemehomt.com'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use('/', express.static(__dirname + '/build'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build'))
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', users);
app.use('/main', main);
app.use('/myroutine', myroutine);

app.listen(PORT, () => {
  console.log(`server on ${PORT}`)
});

module.exports = app;