"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const axios_1 = __importDefault(require("axios"));
const users_model_1 = require("../../models/users.model");
require('dotenv').config();
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const github = async (req, res) => {
    try {
        const { authCode } = req.body;
        const githubToken = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: githubClientId,
            client_secret: githubClientSecret,
            code: authCode
        }, {
            headers: { Accept: 'application/json' }
        });
        const userInfo = await axios_1.default.get('https://api.github.com/user', {
            headers: {
                Accept: `application/json`,
                authorization: `token ${githubToken.data.access_token}`
            }
        });
        const { login, email } = userInfo.data;
        const userName = await users_model_1.users.findOne({
            where: { email: email }
        });
        if (!userName) {
            await users_model_1.users.create({ userName: login, email: email });
        }
        const accessToken = jsonwebtoken_1.sign({
            userName: login,
            email: email
        }, accessKey, {
            expiresIn: '1h'
        });
        const refreshToken = jsonwebtoken_1.sign({
            userName: login,
            email: email
        }, refreshKey, {
            expiresIn: '3h'
        });
        const accessVerify = jsonwebtoken_1.verify(accessToken, accessKey);
        const date = new Date(parseInt(accessVerify.exp) * 1000);
        return res.cookie('refreshToken', refreshToken, { httpOnly: true }).send({
            data: {
                id: 0,
                userName: login,
                email: email,
                auth: {
                    token: accessToken, expData: date
                },
            },
            message: 'auth success'
        });
    }
    catch (err) {
        res.status(500).send({ message: 'server error' });
    }
};
exports.default = github;
//# sourceMappingURL=oauth.github.js.map