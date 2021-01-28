const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const axios = require('axios')
const { users, workouts, routines, routine_workout } = require('../../models');


module.exports = async (req, res) => {
    try {
        const token = req.headers.authorization.substr(7);
        const accessVerify = jwt.verify(token, REFRESH_SECRET)

        const my = await users.findOne({
            where: {
                email: accessVerify.email
            }
        })

        const myRoutine = await routines.findAll({
            where: { userId: my.id },
            include: [{
                model: workouts
            }],
            attributes: ['id', 'title']
        })

        const workoutAxios = await axios.get('http://localhost:8080/main')
        const workoutList = workoutAxios.data.data;
        console.log(workoutList.id);

        let arr = []

        // for(let i=0; i<myRoutine.workouts.length; i++){
        //     arr.push(myRoutine[i].routines)
        // }
        // console.log(arr)


        res.send({ data: myRoutine })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'server error' })
    }
}


