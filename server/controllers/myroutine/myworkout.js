const { users, workouts } = require('../../models');
const { verify } = require('jsonwebtoken');
const axios = require('axios');

const accessToken = process.env.ACCESS_SECRET;

module.exports = async(req,res) =>{
    
    try {
        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = verify(userInfoInToken, accessToken);
        const userId = await users.findOne({
            attributes : ['id'],
            where : {email : checkToken.email}
        })
    
        const myWorkout = await users.findOne({
            where : { id : userId.id},
            attributes : ['id'],
            include : {
                model : workouts,
                attributes : ['id']
            }
        })
    
        const checkInId = myWorkout.workouts.map(workout =>{
            delete workout.dataValues.user_workout
            return workout.dataValues;
        })
    
        const data = await axios.get('http://localhost:8080/main', 
        {header : {withCredentials : true}});
    
        const workoutList = data.data.data;
    
        const resultData  = workoutList.filter(workout => {
            let check = checkInId.filter(id=>{
                return id.id === workout.id
            })
            if(check.length !== 0){
                return true;
            }else{
                return false;
            }
        })


        return resultData.length === 0 ?
            res.send({ message : 'none data'}) :
            res.send({data : resultData, message : 'ok'});
    } catch(err) {
        return res.status(500).send('server error');
    }
}