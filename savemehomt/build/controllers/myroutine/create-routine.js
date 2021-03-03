"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const routines_model_1 = require("../../models/routines.model");
const routine_workouts_model_1 = require("../../models/routine_workouts.model");
const axios_1 = __importDefault(require("axios"));
const url_1 = require("../url");
require('dotenv').config();
const accessKey = process.env.ACCESS_SECRET;
const createRoutine = async (req, res) => {
    try {
        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = jsonwebtoken_1.verify(userInfoInToken, accessKey);
        const { title, workouts } = req.body;
        const userInfo = await users_model_1.users.findOne({
            attributes: ['id'],
            where: { email: checkToken.email },
            raw: true
        });
        const routine = await routines_model_1.routines.create({
            userId: userInfo.id, title: title
        }).then(result => {
            return result.get({ plain: true });
        });
        workouts.map(async (el) => {
            await routine_workouts_model_1.routine_workouts.create({
                routineId: routine.id, workoutId: el.id,
                mySetCount: el.mySetCount, myCount: el.myCount,
                myBreakTime: el.myBreakTime
            });
        });
        const data = await axios_1.default.get(`${url_1.url.URL}/main`, { headers: { withCredentials: true } });
        const workoutList = data.data.data;
        let resultData = new Array;
        workoutList.forEach(workoutData => {
            workouts.forEach(el => {
                if (el.id === workoutData.id) {
                    delete workoutData.count;
                    delete workoutData.setCount;
                    delete workoutData.breakTime;
                    workoutData.myCount = el.myCount;
                    workoutData.mySetCount = el.mySetCount;
                    workoutData.myBreakTime = el.myBreakTime;
                    resultData.push(workoutData);
                }
            });
        });
        return res.send({
            data: [{
                    routineId: routine.id, title: title, workouts: resultData
                }],
            message: 'ok'
        });
    }
    catch (err) {
        return res.status(500).send({ message: "server error" });
    }
};
exports.default = createRoutine;
//# sourceMappingURL=create-routine.js.map