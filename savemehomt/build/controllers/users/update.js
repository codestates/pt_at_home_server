"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = require("../../models/users.model");
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const saltRounds = 10;
const update = async (req, res) => {
    const { userName, password } = req.body;
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' });
    }
    else {
        const token = req.headers.authorization.substr(7);
        try {
            const tokenVerify = jsonwebtoken_1.verify(token, ACCESS_SECRET);
            const date = new Date(parseInt(tokenVerify.exp) * 1000);
            if (userName && password) {
                const hash = await bcrypt_1.default.hash(req.body.password, saltRounds);
                await users_model_1.users.update({ userName, password: hash }, { where: { email: tokenVerify.email } });
                const userInfo = await users_model_1.users.findOne({ where: { email: tokenVerify.email } });
                res.status(200)
                    .send({
                    data: {
                        id: userInfo.id,
                        userName: userInfo.userName,
                        email: userInfo.email,
                        auth: {
                            token: token,
                            expDate: date
                        }
                    },
                    message: 'userName And Password update success'
                });
            }
            else if (userName) {
                await users_model_1.users.update({ userName }, { where: { email: tokenVerify.email } });
                const userInfo = await users_model_1.users.findOne({ where: { email: tokenVerify.email } });
                res.status(200)
                    .send({
                    data: {
                        id: userInfo.id,
                        userName: userInfo.userName,
                        email: userInfo.email,
                        auth: {
                            token: token,
                            expDate: date
                        }
                    },
                    message: 'userName update success'
                });
            }
            else if (password) {
                const hash = await bcrypt_1.default.hash(req.body.password, saltRounds);
                await users_model_1.users.update({ password: hash }, { where: { email: tokenVerify.email } });
                const userInfo = await users_model_1.users.findOne({ where: { email: tokenVerify.email } });
                res.status(200)
                    .send({
                    data: {
                        id: userInfo.id,
                        userName: userInfo.userName,
                        email: userInfo.email,
                        auth: {
                            token: token,
                            expDate: date
                        }
                    },
                    message: 'password update success'
                });
            }
            else {
                res.status(300).send({ message: 'update failed' });
            }
        }
        catch (err) {
            res.status(500).send({ message: 'server error' });
        }
    }
};
exports.default = update;
//# sourceMappingURL=update.js.map