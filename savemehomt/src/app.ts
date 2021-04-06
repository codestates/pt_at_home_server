import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import cors from 'cors';
import express from 'express';
import {sequelize} from './models/sequelize'


import {main, users, myroutine} from './routes/index';
require('dotenv').config()

const app:express.Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


sequelize.sync().then(()=>{
  console.log("DB 연결 성공");
}).catch(err => {
  console.log("DB 연결 실패");
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

if(process.env.PORT){
  app.use(cors({
    origin: [
      'https://savemehomt.com',
      'https://s.savemehomt.com'
    ],
    methods: ['GET', 'POST','OPTIONS'],
    credentials: true
  }))
  app.use(logger('combined'));
}else{
  app.use(cors({
    origin : true,
    methods: ['GET', 'POST','OPTIONS'],
    credentials: true
  }))
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/users', users);
app.use('/main', main);
app.use('/myroutine', myroutine);


app.listen(PORT, () => {
  console.log(`server on ${PORT}`)
});

module.exports = app;
