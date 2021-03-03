import {expressTemplate} from '../../interfaces/users.interface';
import { routines } from '../../models/routines.model';
import sequelize from "sequelize";
import { users } from "../../models/users.model";
import { workouts } from '../../models/workouts.model';
import axios from "axios";
import { verify } from "jsonwebtoken";
import { url } from "../url";
import { listType } from "../../interfaces/main.interface";

require('dotenv').config();

const ACCESS_SECRET = process.env.ACCESS_SECRET

interface routineType {
    title : string;
    routineId : number;
    workout : any;
}

const myRoutine: expressTemplate = async(req,res)=>{
    const judgeMyOrRecommend = async (email) => {
        const userInfo = await users.findOne({
            where: {
                email: email
            }
        })

        const routineList = await workouts.findAll({
            include : {model : routines, where : {userId : userInfo.id}},
            order : [sequelize.col('routines.id')],
            raw : true
        })

        const data = await axios.get(`${url.URL}/main`,
            { headers : { withCredentials: true } });

        const workoutList:Array<listType> = data.data.data;

        let resultData:routineType = {title : routineList[0]['routines.title'], routineId : routineList[0]['routines.id'], workout :[]} 

        let result = new Array;

        const deleteAndAdd = (routineEl, workList) =>{
            delete workList.count
            delete workList.setCount
            delete workList.breakTime
            workList.myCount = routineEl['routines.routine_workouts.myCount']
            workList.mySetCount = Number(routineEl['routines.routine_workouts.mySetCount'])
            workList.myBreakTime = Number(routineEl['routines.routine_workouts.myBreakTime'])
            resultData.workout.push(workList);
        }

        routineList.map((el, index)=>{
            if(resultData.routineId === el['routines.id']){
                workoutList.map(list=>{
                    if(el.id === list.id){
                        deleteAndAdd(el,list);
                    }
                })   
            }else{
                result.push(resultData);
                resultData = {title : el['routines.title'], routineId : el['routines.id'], workout :[]}
                workoutList.map(list=>{
                    if(el.id === list.id){
                        deleteAndAdd(el,list);
                    }
                })  
            }
            if(index === routineList.length-1){
                result.push(resultData);
            }
        })

        return result.length === 0 ?
            res.send({ message: 'none data' }) :
            res.send({ data: result, message: 'ok' });
    }


    if (!req.headers.authorization) {
        try {
            judgeMyOrRecommend('admin');

        } catch (err) {
            return res.status(500).send({ message: 'server error' })
        }
    } else {
        try {
            const token:string = req.headers.authorization.substr(7);
            const accessVerify:any = verify(token, ACCESS_SECRET);
            const email = accessVerify.email
            judgeMyOrRecommend(email);

        } catch (err) {
            return res.status(500).send({ message: 'server error' })
        }
    }


}

export default myRoutine;
