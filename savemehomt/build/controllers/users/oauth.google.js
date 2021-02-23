"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const axios_1 = __importDefault(require("axios"));
const users_model_1 = require("../../models/users.model");
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const google = async (req, res) => {
    const TOKEN_URL = "https://oauth2.googleapis.com/token";
    const queryStr = qs_1.default.stringify({
        code: req.body.authCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code'
    });
    const url = TOKEN_URL + "?" + queryStr;
    try {
        const token = (await axios_1.default.post(url, null)).data;
        const userdata = (await axios_1.default.post('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token.access_token, null));
        const accessToken = jsonwebtoken_1.sign({
            userName: userdata.data.email.split('@')[0],
            email: userdata.data.email
        }, ACCESS_SECRET, {
            expiresIn: '1h'
        });
        const refreshToken = jsonwebtoken_1.sign({
            userName: userdata.data.email.split('@')[0],
            email: userdata.data.email
        }, REFRESH_SECRET, {
            expiresIn: '3h'
        });
        let userInfo = await users_model_1.users.findOne({
            where: { email: userdata.data.email }
        });
        if (!userInfo) {
            await users_model_1.users.create({
                email: userdata.data.email.split('@')[0],
                userName: userdata.data.email,
                accessToken: token.access_token,
                refreshToken: token.refresh_token
            });
        }
        else {
            await users_model_1.users.update({ accessToken: token.access_token, refreshToken: token.refresh_token }, { where: { email: userdata.data.email } });
        }
        const accessVerify = jsonwebtoken_1.verify(accessToken, ACCESS_SECRET);
        const date = new Date(parseInt(accessVerify.exp) * 1000);
        res.status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true })
            .send({
            data: {
                id: userInfo.id,
                userName: userInfo.userName.split('@')[0],
                email: userInfo.email,
                auth: {
                    token: token.access_token,
                    expDate: date
                },
                createdAt: userInfo.createdAt,
                updatedAt: userInfo.updatedAt
            },
            message: 'auth success'
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
    }
};
exports.default = google;
//# sourceMappingURL=oauth.google.js.map