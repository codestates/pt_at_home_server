"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const routines_model_1 = require("../../models/routines.model");
const routine_workouts_model_1 = require("../../models/routine_workouts.model");
const users_model_1 = require("../../models/users.model");
const user_workouts_model_1 = require("../../models/user_workouts.model");
const accessKey = process.env.ACCESS_SECRET;
const resign = async (req, res) => {
    const { email } = req.body;
    const userInfoInToken = req.headers.authorization.substr(7);
    const checkToken = jsonwebtoken_1.verify(userInfoInToken, accessKey);
    const checkUser = await users_model_1.users.findOne({ where: { email: email } });
    try {
        if (checkUser.email === checkToken.email) {
            const routineId = await routines_model_1.routines.findAll({ where: { userId: checkUser.id } });
            routineId.map(async (routine) => {
                await routine_workouts_model_1.routine_workouts.destroy({ where: { routineId: routine.id } });
            });
            await routines_model_1.routines.destroy({ where: { userId: checkUser.id } });
            await user_workouts_model_1.user_workouts.destroy({ where: { userId: checkUser.id } });
            await users_model_1.users.destroy({ where: { email: email } });
            res.clearCookie('refreshToken').send({ message: 'resign success' });
        }
        else {
            return res.status(400).send({ message: 'cannot verified' });
        }
    }
    catch (err) {
        return res.status(500).send({ message: 'server error' });
    }
};
exports.default = resign;
//# sourceMappingURL=resign.js.map