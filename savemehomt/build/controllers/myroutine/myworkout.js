"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const axios_1 = __importDefault(require("axios"));
const url_1 = require("../url");
const user_workouts_model_1 = require("../../models/user_workouts.model");
require('dotenv').config();
const accessToken = process.env.ACCESS_SECRET;
const myWorkout = async (req, res) => {
    try {
        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = jsonwebtoken_1.verify(userInfoInToken, accessToken);
        const userId = await users_model_1.users.findOne({
            attributes: ['id'],
            where: { email: checkToken.email },
            raw: true
        });
        const myWorkout = await user_workouts_model_1.user_workouts.findAll({
            attributes: ['workoutId'],
            where: { userId: userId.id },
            raw: true
        });
        const data = await axios_1.default.get(`${url_1.url.URL}/main`, { headers: { withCredentials: true } });
        const workoutList = data.data.data;
        const resultData = workoutList.filter(workout => {
            let check = myWorkout.filter(id => {
                return Number(id.workoutId) === workout.id;
            });
            if (check.length !== 0) {
                return true;
            }
            else {
                return false;
            }
        });
        return resultData.length === 0 ?
            res.send({ message: 'none data' }) :
            res.send({ data: resultData, message: 'ok' });
    }
    catch (err) {
        return res.status(500).send('server error');
    }
};
exports.default = myWorkout;
//# sourceMappingURL=myworkout.js.map