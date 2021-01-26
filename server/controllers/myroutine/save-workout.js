const { users, workouts, parts, user_workout } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const axios = require('axios')

module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        try {
            const token = req.headers.authorization.split(" ")[2];
            const accessVerify = jwt.verify(token, REFRESH_SECRET)

            const userInfo = await users.findOne({
                attributes: ['id'],
                where: { email: accessVerify.email }
            }) // userId
            console.log("++", userInfo)

            const save = await user_workout.create({
                userId: userInfo.dataValues.id,
                workoutId: req.body.workoutId
            }) // 조인테이블
            // console.log("--", save.userId, save.workoutId)

            const workoutAxios = await axios.get('http://localhost:8080/main')
            const workoutList = workoutAxios.data.data;
            // console.log("##", workoutList)

            let data = [];
            for(let i=0; i<workoutList.length; i++){
                if(workoutList[i].id === req.body.workoutId) {
                    data.push(workoutList[i])
                }
            }
            // console.log("@@", data)

            res.status(200)
            .send({
                data, 
                message: 'ok'
            })
        } catch (err) {
            res.status(500).send("server error")
        }
    }
}