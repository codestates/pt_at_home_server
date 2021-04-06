import {expressTemplate} from '../../interfaces/users.interface';
import { routines, users, workouts} from '../../models/index'
import sequelize from "sequelize";
import { verify } from "jsonwebtoken";
import workList from '../helper';

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

        if(!userInfo){
            return res.status(404).send("not admin");
        }

        const routineList = await workouts.findAll({
            include : {model : routines, where : {userId : userInfo.id}},
            order : [sequelize.col('routines.id')],
            raw : true
        })

        if(routineList.length === 0){
            return res.status(200).send({ message: 'none data' })
        }

        const workoutList = await workList();

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

        return res.status(200).send({ data: result, message: 'ok' });
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
