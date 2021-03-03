"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;
const kakao = async (req, res) => {
    try {
        const code = req.body.authCode;
        const kakaoToken = await axios_1.default({
            method: "POST",
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: qs_1.default.stringify({
                grant_type: "authorization_code",
                client_id: kakaoClientId,
                client_secret: kakaoClientSecret,
                redirect_uri: 'https://savemehomt.com/dashboard',
                code
            })
        });
        const { access_token } = kakaoToken.data;
        const userInfo = await axios_1.default({
            method: "POST",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            },
            data: qs_1.default.stringify({
                property_keys: ["kakao_account.email"]
            })
        });
        const { properties, kakao_account } = userInfo.data;
        const accessToken = jsonwebtoken_1.sign({
            userName: properties.nickname,
            email: kakao_account.email
        }, accessKey, {
            expiresIn: '1h'
        });
        const refreshToken = jsonwebtoken_1.sign({
            userName: properties.nickname,
            email: kakao_account.email
        }, refreshKey, {
            expiresIn: '3h'
        });
        const checkUser = await users_model_1.users.findOne({ where: { email: kakao_account.email } });
        if (!checkUser) {
            await users_model_1.users.create({
                userName: properties.nickname,
                email: kakao_account.email,
                accessToken: kakaoToken.access_token,
                refreshToken: kakaoToken.refresh_token
            });
        }
        const accessVerify = jsonwebtoken_1.verify(accessToken, accessKey);
        const date = new Date(parseInt(accessVerify.exp) * 1000);
        return res.cookie('refreshToken', refreshToken, { httpOnly: true }).send({
            data: {
                id: 0,
                userName: properties.nickname,
                email: kakao_account.email,
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
exports.default = kakao;
//# sourceMappingURL=oauth.kakao.js.map