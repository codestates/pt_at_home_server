"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routines_model_1 = require("../../models/routines.model");
const sequelize_1 = __importDefault(require("sequelize"));
const users_model_1 = require("../../models/users.model");
const workouts_model_1 = require("../../models/workouts.model");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = require("jsonwebtoken");
const url_1 = require("../url");
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const myRoutine = async (req, res) => {
    const judgeMyOrRecommend = async (email) => {
        const userInfo = await users_model_1.users.findOne({
            where: {
                email: email
            }
        });
        const routineList = await workouts_model_1.workouts.findAll({
            include: { model: routines_model_1.routines, where: { userId: userInfo.id } },
            order: [sequelize_1.default.col('routines.id')],
            raw: true
        });
        const data = await axios_1.default.get(`${url_1.url.URL}/main`, { headers: { withCredentials: true } });
        const workoutList = data.data.data;
        let resultData = { title: routineList[0]['routines.title'], routineId: routineList[0]['routines.id'], workout: [] };
        let result = new Array;
        const deleteAndAdd = (routineEl, workList) => {
            delete workList.count;
            delete workList.setCount;
            delete workList.breakTime;
            workList.myCount = routineEl['routines.routine_workouts.myCount'];
            workList.mySetCount = Number(routineEl['routines.routine_workouts.mySetCount']);
            workList.myBreakTime = Number(routineEl['routines.routine_workouts.myBreakTime']);
            resultData.workout.push(workList);
        };
        routineList.map((el, index) => {
            if (resultData.routineId === el['routines.id']) {
                workoutList.map(list => {
                    if (el.id === list.id) {
                        deleteAndAdd(el, list);
                    }
                });
            }
            else {
                result.push(resultData);
                resultData = { title: el['routines.title'], routineId: el['routines.id'], workout: [] };
                workoutList.map(list => {
                    if (el.id === list.id) {
                        deleteAndAdd(el, list);
                    }
                });
            }
            if (index === routineList.length - 1) {
                result.push(resultData);
            }
        });
        return result.length === 0 ?
            res.send({ message: 'none data' }) :
            res.send({ data: result, message: 'ok' });
    };
    if (!req.headers.authorization) {
        try {
            judgeMyOrRecommend('admin');
        }
        catch (err) {
            return res.status(500).send({ message: 'server error' });
        }
    }
    else {
        try {
            const token = req.headers.authorization.substr(7);
            const accessVerify = jsonwebtoken_1.verify(token, ACCESS_SECRET);
            const email = accessVerify.email;
            judgeMyOrRecommend(email);
        }
        catch (err) {
            return res.status(500).send({ message: 'server error' });
        }
    }
};
exports.default = myRoutine;
//# sourceMappingURL=myroutine.js.map