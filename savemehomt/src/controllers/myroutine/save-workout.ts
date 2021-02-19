import {expressTemplate} from '../../interfaces/users.interface';
import {verify} from 'jsonwebtoken';
import {users} from '../../models/users.model'
import {user_workouts} from '../../models/user_workouts.model'
import {url} from '../url';
import {listType} from '../../interfaces/main.interface';
import axios from 'axios';
import {Op} from 'sequelize';
import {userInfoType} from '../../interfaces/myroutine.interface'
require('dotenv').config();

const ACCESS_SECRET:string = process.env.ACCESS_SECRET

const saveWorkout: expressTemplate = async(req,res)=>{

    try {
        const { workoutId } : {workoutId : number}= req.body

        const token = req.headers.authorization.substr(7);

        const accessVerify:any = verify(token, ACCESS_SECRET)

        const userInfo:userInfoType = await users.findOne({
            attributes: ['id'],
            where: { email: accessVerify.email },
            raw :true
        }) 

        await user_workouts.findOrCreate({
            where : {
                [Op.and] : [{userId : userInfo.id}, {workoutId : workoutId}]
            },
            defaults : {
                userId: userInfo.id,
                workoutId: workoutId
            },
            raw :true
        }) 

        const workoutAxios = await axios.get(`${url.URL}/main`)
        const workoutList:Array<listType> = workoutAxios.data.data;

        let data = [];
        for (let i = 0; i < workoutList.length; i++) {
            if (workoutList[i].id === workoutId) {
                data.push(workoutList[i])
            }
        }

        res.status(200).redirect(`${url.URL}/myroutine/myworkout`)

    } catch (err) {
        res.status(500).send("server error")
    }
}

export default saveWorkout;
