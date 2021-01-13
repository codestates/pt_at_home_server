import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

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