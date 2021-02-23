"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../../models/users.model");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const signout = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' });
    }
    else {
        const token = req.headers.authorization.substr(7);
        try {
            const tokenVerify = jsonwebtoken_1.verify(token, ACCESS_SECRET);
            console.log(tokenVerify);
            let userInfo = await users_model_1.users.findOne({
                where: { email: tokenVerify.email }
            });
            if (tokenVerify.email === userInfo.email) {
                await users_model_1.users.update({ accessToken: null, refreshToken: null }, { where: { email: tokenVerify.email } });
            }
            res.status(200)
                .cookie('accessToken', null, { httpOnly: true })
                .send({ message: 'signout success' });
        }
        catch (err) {
            res.status(500).send({ message: 'server error' });
        }
    }
};
exports.default = signout;
//# sourceMappingURL=signout.js.map