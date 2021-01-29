const { users, user_workout } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const axios = require('axios')
const {URL}= require('../../controllers/url');

module.exports = async (req, res) => {
    try {
        const token = req.headers.authorization.substr(7);
        const accessVerify = jwt.verify(token, ACCESS_SECRET)

        const userInfo = await users.findOne({
            attributes: ['id'],
            where: { email: accessVerify.email }
        }) // userId

        const save = await user_workout.create({
            userId: userInfo.dataValues.id,
            workoutId: req.body.workoutId
        }) // 조인테이블

        const workoutAxios = await axios.get(`${URL}/main`)
        const workoutList = workoutAxios.data.data;

        let data = [];
        for (let i = 0; i < workoutList.length; i++) {
            if (workoutList[i].id === req.body.workoutId) {
                data.push(workoutList[i])
            }
        }

        res.status(200).redirect(`${URL}/myroutine/myworkout`)

    } catch (err) {
        res.status(500).send("server error")
    }

}