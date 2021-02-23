"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const token = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' });
    }
    else {
        try {
            const refreshVerify = jsonwebtoken_1.verify(req.cookies.refreshToken, REFRESH_SECRET);
            const refreshInfo = await users_model_1.users.findOne({ where: { email: refreshVerify.email } });
            if (req.cookies.refreshToken === refreshInfo.refreshToken) {
                const accessToken = jsonwebtoken_1.sign({
                    id: refreshVerify.id,
                    userName: refreshVerify.userName,
                    email: refreshVerify.email
                }, ACCESS_SECRET, {
                    expiresIn: '1h'
                });
                const accessVerify = jsonwebtoken_1.verify(accessToken, ACCESS_SECRET);
                const date = new Date(parseInt(accessVerify.exp) * 1000);
                await users_model_1.users.update({ accessToken }, { where: { email: refreshInfo.email } });
                res.status(200)
                    .send({
                    data: {
                        token: accessToken,
                        expDate: date
                    },
                    message: 'accessToken verified'
                });
            }
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(400)
                    .send({ message: 'please Login' });
            }
            else {
                res.status(500)
                    .send({ message: 'server error' });
            }
        }
    }
};
exports.default = token;
//# sourceMappingURL=token.js.map