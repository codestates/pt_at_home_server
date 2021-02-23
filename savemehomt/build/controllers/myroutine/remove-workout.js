"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const user_workouts_model_1 = require("../../models/user_workouts.model");
const sequelize_1 = require("sequelize");
const url_1 = require("../url");
require('dotenv').config();
const accessKey = process.env.ACCESS_SECRET;
const removeWorkout = async (req, res) => {
    try {
        const { workoutId } = req.body;
        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = jsonwebtoken_1.verify(userInfoInToken, accessKey);
        const _userId = await users_model_1.users.findOne({
            attributes: ['id'],
            where: { email: checkToken.email },
            raw: true
        });
        await user_workouts_model_1.user_workouts.destroy({
            where: {
                [sequelize_1.Op.and]: [
                    { userId: _userId.id },
                    { workoutId: workoutId }
                ]
            }
        });
        return res.redirect(`${url_1.url.URL}/myroutine/myworkout`);
    }
    catch (err) {
        return res.status(500).send('server error');
    }
};
exports.default = removeWorkout;
//# sourceMappingURL=remove-workout.js.map