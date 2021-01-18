import express = require('express');
import cors =require('cors')
import cookieParser = require('cookie-parser')
import {sequelize}  from './src/models/database';

const app = express();

sequelize
  .sync({ force: false }) // NOTE: db 실행시 초기화 할건지?(true: 초기화)
  .then(() => {
    console.log('데이터 베이스 연결 성공');
  })
  .catch((err: Error) => {
    console.log('연결 실패', err);
  });

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:true,
    methods:["GET", "POST", "OPTIONS"],
    credentials:true
}))


app.get('/', (req, res) => {
    console.log('hello')
    res.send('hello')
})

app.listen(8080, () => {
    console.log('server is on port 8080')
})