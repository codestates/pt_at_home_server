import {expressTemplate} from '../../interfaces/users.interface';
import { verify } from 'jsonwebtoken';
import { users } from '../../models/users.model';
import axios from 'axios';
import {url} from '../url'
import { user_workouts } from '../../models/user_workouts.model';
import {userType} from '../../interfaces/myroutine.interface';
import {listType} from '../../interfaces/main.interface'
require('dotenv').config();

const accessToken = process.env.ACCESS_SECRET;

const myWorkout: expressTemplate = async(req,res)=>{
    try {
        const userInfoInToken:string = req.headers.authorization.substr(7);
        const checkToken:any = verify(userInfoInToken, accessToken);
        const userId:userType = await users.findOne({
            attributes: ['id'],
            where: { email: checkToken.email },
            raw : true
        })

        const myWorkout = await user_workouts.findAll({
            attributes : ['workoutId'],
            where : {userId : userId.id},
            raw : true
        })

        console.log(myWorkout);


        const data = await axios.get(`${url.URL}/main`,
            { headers: { withCredentials: true } });

        const workoutList:Array<listType> = data.data.data;

        const resultData:Array<listType> = workoutList.filter(workout => {
            let check = myWorkout.filter(id => {
                return Number(id.workoutId) === workout.id
            })
            if (check.length !== 0) {
                return true;
            } else {
                return false;
            }
        })

        return resultData.length === 0 ?
            res.send({ message: 'none data' }) :
            res.send({ data: resultData, message: 'ok' });
    } catch (err) {
        return res.status(500).send('server error');
    }
}

export default myWorkout;
