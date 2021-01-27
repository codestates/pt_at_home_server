const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const axios = require('axios')
const { users, workouts, routines, routine_workout } = require('../../models');

module.exports = async (req, res) => {
    try {
        const token = req.headers.authorization.substr(7);
        const accessVerify = jwt.verify(token, REFRESH_SECRET)

        const delroutine = await routines.findOne({
            where: { id: req.body.routineId },
            include: {
                model: workouts
            }
        })

        const delrw = await routine_workout.findOne({
            where: { routineId: req.body.routineId }
        })

        res.redirect('http://localhost:8080/myroutine')

    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
}
