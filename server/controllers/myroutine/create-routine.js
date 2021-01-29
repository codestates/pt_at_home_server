const { users, routines, routine_workout } = require('../../models');
const accessKey = process.env.ACCESS_SECRET;
const { verify } = require('jsonwebtoken');
const { URL } = require('../../controllers/url');
const axios = require('axios');

module.exports = async(req,res) =>{

    try {
        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = verify(userInfoInToken, accessKey);
        const { title , workouts} = req.body

        const userInfo = await users.findOne({
            attributes : ['id'],
            where : { email : checkToken.email}
        })

        const routine = await routines.create({
            userId : userInfo.id, title : title
        }) //routines table에 userId, title 저장

        workouts.map(async(el)=>{
            await routine_workout.create({
                routineId : routine.id, workoutId : el.id,
                mySetCount : el.mySetCount, myCount : el.myCount,
                myBreakTime : el.myBreakTime
            })
        })//routine_workout table에 my값 저장

        const data = await axios.get(`${URL}/main`, 
        {header : {withCredentials : true}});

        const workoutList = data.data.data;

        let resultData = new Array;
        workoutList.forEach(workoutData =>{
            workouts.forEach(el=>{
                if(el.id === workoutData.id){
                    delete workoutData.count
                    delete workoutData.setCount
                    delete workoutData.breakTime
                    workoutData.myCount = el.myCount
                    workoutData.mySetCount = el.mySetCount
                    workoutData.myBreakTime = el.myBreakTime
                    resultData.push(workoutData);
                }
            });
        })

        return res.send({
            data : [{ 
                routineId : routine.id, title: title , workouts : resultData
            }], 
            message : 'ok'
        });
    } catch(err){
        return res.status(500).send({message : "server error"})
    }    
}