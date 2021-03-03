"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
require('dotenv').config();
const saltRounds = 10;
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;
const signup = async (req, res) => {
    const { email, password, userName } = req.body;
    const userCheck = await users_model_1.users.findOne({ where: { email: email } });
    try {
        if (!userCheck) {
            const userInfo = { email: email, userName: userName };
            const accessToken = jsonwebtoken_1.sign(userInfo, accessKey, {
                expiresIn: '10h'
            });
            const refreshToken = jsonwebtoken_1.sign(userInfo, refreshKey, {
                expiresIn: '10h'
            });
            const hashPassword = await bcrypt_1.default.hash(password, saltRounds);
            let result = await users_model_1.users.create({
                email: email,
                password: hashPassword,
                userName: userName,
                accessToken: accessToken,
                refreshToken: refreshToken,
            }).then(result => {
                return result.get({ plain: true });
            });
            const accessVerify = jsonwebtoken_1.verify(accessToken, accessKey);
            const date = new Date(parseInt(accessVerify.exp) * 1000);
            result.auth = {
                token: result.accessToken,
                expDate: date
            };
            delete result.refreshToken;
            delete result.accessToken;
            return res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
            }).send({ data: result, message: 'signup success' });
        }
        else {
            if (userCheck.email === email) {
                return res.status(300).send({ message: 'user already exists' });
            }
            else if (userCheck.userName === userName) {
                return res.status(300).send({ message: 'userName not allowed' });
            }
        }
    }
    catch (err) {
        return res.status(500).send({ message: 'server error' });
    }
};
exports.default = signup;
//# sourceMappingURL=signup.js.map