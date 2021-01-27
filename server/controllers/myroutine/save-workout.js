const { users, workouts, parts, user_workout } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const axios = require('axios')

module.exports = async (req, res) => {
    try {
        const token = req.headers.authorization.substr(7);
        const accessVerify = jwt.verify(token, REFRESH_SECRET)

        const userInfo = await users.findOne({
            attributes: ['id'],
            where: { email: accessVerify.email }
        }) // userId

        const save = await user_workout.create({
            userId: userInfo.dataValues.id,
            workoutId: req.body.workoutId
        }) // 조인테이블

        const workoutAxios = await axios.get('http://localhost:8080/main')
        const workoutList = workoutAxios.data.data;

        let data = [];
        for (let i = 0; i < workoutList.length; i++) {
            if (workoutList[i].id === req.body.workoutId) {
                data.push(workoutList[i])
            }
        }

        res.status(200).redirect('http://localhost:8080/myroutine/myworkout')

    } catch (err) {
        res.status(500).send("server error")
    }

}