import {expressTemplate} from '../../interfaces/users.interface';
import { verify } from "jsonwebtoken";
import { users } from "../../models/users.model";
import { routines } from "../../models/routines.model";
import { routine_workouts } from "../../models/routine_workouts.model";
import axios from "axios";
import { url } from "../url";
import { reqType } from "../../interfaces/myroutine.interface";
import { userInfoType, routineType } from "../../interfaces/myroutine.interface";
import { listType } from "../../interfaces/main.interface";
require('dotenv').config();

const accessKey:string = process.env.ACCESS_SECRET;

const createRoutine: expressTemplate = async(req,res)=>{
    try {
        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken:any = verify(userInfoInToken, accessKey);
        const { title, workouts } : reqType = req.body

        const userInfo:userInfoType = await users.findOne({
            attributes: ['id'],
            where: { email: checkToken.email },
            raw :true
        })

        const routine:routineType = await routines.create({
            userId: userInfo.id, title: title
        }).then(result =>{
            return result.get({plain:true})
        })

        workouts.map(async (el) => {
            await routine_workouts.create({
                routineId: routine.id, workoutId: el.id,
                mySetCount: el.mySetCount, myCount: el.myCount,
                myBreakTime: el.myBreakTime
            })
        })

        const data = await axios.get(`${url.URL}/main`,
            { headers: { withCredentials: true } });

        const workoutList:Array<listType> = data.data.data;

        let resultData = new Array;
        workoutList.forEach(workoutData => {
            workouts.forEach(el => {
                if (el.id === workoutData.id) {
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
            data: [{
                routineId: routine.id, title: title, workouts: resultData
            }],
            message: 'ok'
        });
    } catch (err) {
        return res.status(500).send({ message: "server error" })
    }
}

export default createRoutine;