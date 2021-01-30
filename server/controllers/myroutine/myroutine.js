const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const axios = require('axios')
const { users, workouts, routines } = require('../../models');
const {URL}= require('../../controllers/url');

module.exports = async (req, res) => {

        const judgeMyOrRecommend = async(email) => {
            const userInfo = await users.findOne({
                where: {
                    email: email
                }
            })
    
            const myRoutine = await routines.findAll({
                attributes : [ 'id', 'title' ],
                where : { userId : userInfo.id },
                include : {
                    attributes : ['id'],
                    model : workouts
                }
            });
    
            const data = await axios.get(`${URL}/main`, 
            {header : {withCredentials : true}});
            
            const workoutList = data.data.data;
    
            const routineList = myRoutine.map(routine=>{
                return routine.workouts.map(workout=>{
                    const myWorkouts = new Array;
                    workoutList.forEach(list=>{
                        if(workout.id === list.id){
                            delete list.setCount
                            delete list.count
                            delete list.breakTime
                            list.mySetCount = workout.routine_workout.mySetCount
                            list.myCount = workout.routine_workout.myCount
                            list.myBreakTime = workout.routine_workout.myBreakTime
                            myWorkouts.push(list);
                        }
                    })
                    return myWorkouts
                })
            })
    
            const result = routineList.map((el,index)=>{
                const addTitle = { 
                    routineId : myRoutine[index].id,
                    title : myRoutine[index].title,
                    workout: el
                }
                return addTitle
            })
    
            return result.length === 0 ? 
                res.send({ message : 'none data'}) : 
                res.send({ data : result , message : 'ok'});
        }


        if(!req.headers.authorization){
            try{

                judgeMyOrRecommend(0);

            }catch(err){
                return res.status(500).send({message : 'server error'})
            }
        }else{
            try{
                const token = req.headers.authorization.substr(7);
                const accessVerify = jwt.verify(token, ACCESS_SECRET);
                const email = accessVerify.email
    
                judgeMyOrRecommend(email);

            }catch(err){
                return res.status(500).send({message : 'server error'})
            }
        }



}