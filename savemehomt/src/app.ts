import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import cors from 'cors';
import express from 'express';
import models from './database';

import {main, users, myroutine} from './routes/index';
require('dotenv').config()

const app:express.Application = express();
const PORT:number = 8080;

app.use(express.json());


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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/users', users);
app.use('/main', main);
app.use('/myroutine', myroutine);


// app.use('/', express.static(__dirname + '/build'));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

app.listen(PORT, () => {
  console.log(`server on ${PORT}`)
});

module.exports = app;
