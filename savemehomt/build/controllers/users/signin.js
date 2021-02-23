"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = require("../../models/users.model");
const jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const signin = async (req, res) => {
    try {
        const userInfo = await users_model_1.users.findOne({ where: { email: req.body.email }, raw: true });
        const checkPassword = await bcrypt_1.default.compare(req.body.password, userInfo.password);
        if (checkPassword) {
            if (req.body.email === userInfo.email) {
                const accessToken = jsonwebtoken_1.sign({
                    id: userInfo.id,
                    userName: userInfo.userName,
                    email: userInfo.email
                }, ACCESS_SECRET, {
                    expiresIn: '1h'
                });
                const refreshToken = jsonwebtoken_1.sign({
                    id: userInfo.id,
                    userName: userInfo.userName,
                    email: userInfo.email
                }, REFRESH_SECRET, {
                    expiresIn: '3h'
                });
                await users_model_1.users.update({ accessToken, refreshToken }, { where: { email: req.body.email } });
                const accessVerify = jsonwebtoken_1.verify(accessToken, ACCESS_SECRET);
                const date = new Date(parseInt(accessVerify.exp) * 1000);
                res.status(200)
                    .cookie('refreshToken', refreshToken, { httpOnly: true })
                    .send({
                    data: {
                        id: userInfo.id,
                        userName: userInfo.userName,
                        email: userInfo.email,
                        auth: {
                            token: accessToken,
                            expDate: date,
                        },
                        createdAt: userInfo.createdAt,
                        updatedAt: userInfo.updatedAt
                    },
                    message: 'signin success'
                });
            }
            else {
                res.status(300).send({ message: 'user not exist' });
            }
        }
        else {
            res.status(300).send({ message: 'user not exist' });
        }
    }
    catch (err) {
        res.status(500).send({ message: 'server error' });
    }
};
exports.default = signin;
//# sourceMappingURL=signin.js.map