"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const user_workouts_model_1 = require("../../models/user_workouts.model");
const url_1 = require("../url");
const axios_1 = __importDefault(require("axios"));
const sequelize_1 = require("sequelize");
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const saveWorkout = async (req, res) => {
    try {
        const { workoutId } = req.body;
        const token = req.headers.authorization.substr(7);
        const accessVerify = jsonwebtoken_1.verify(token, ACCESS_SECRET);
        const userInfo = await users_model_1.users.findOne({
            attributes: ['id'],
            where: { email: accessVerify.email },
            raw: true
        });
        await user_workouts_model_1.user_workouts.findOrCreate({
            where: {
                [sequelize_1.Op.and]: [{ userId: userInfo.id }, { workoutId: workoutId }]
            },
            defaults: {
                userId: userInfo.id,
                workoutId: workoutId
            },
            raw: true
        });
        const workoutAxios = await axios_1.default.get(`${url_1.url.URL}/main`);
        const workoutList = workoutAxios.data.data;
        let data = [];
        for (let i = 0; i < workoutList.length; i++) {
            if (workoutList[i].id === workoutId) {
                data.push(workoutList[i]);
            }
        }
        res.status(200).redirect(`${url_1.url.URL}/myroutine/myworkout`);
    }
    catch (err) {
        res.status(500).send("server error");
    }
};
exports.default = saveWorkout;
//# sourceMappingURL=save-workout.js.map