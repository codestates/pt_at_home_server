const { users } = require('../../models');
const { sign, verify } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;
require('dotenv').config();


module.exports = async (req, res) => {
    const { email, password, userName } = req.body

    const userCheck = await users.findOne({ where: { email: email } })

    try {
        if (!userCheck) {
            const userInfo = { email: email, userName: userName }

            const accessToken = sign(userInfo, accessKey,
                {
                    expiresIn: '1h'
                })

            const refreshToken = sign(userInfo, refreshKey,
                {
                    expiresIn: '3h'
                })
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const result = await users.create(
                {
                    email: email,
                    password: hashPassword,
                    userName: userName,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            );

            const accessVerify = verify(accessToken, accessKey);
            const date = new Date(parseInt(accessVerify.exp) * 1000)
            result.dataValues.auth = {
                token: result.accessToken,
                expDate: date
            }

            delete result.dataValues.refreshToken
            delete result.dataValues.accessToken

            return res.cookie('refreshToken', refreshToken,
                {
                    httpOnly: true,
                }
            ).send({ data: result, message: 'signup success' })
        } else {
            if (userCheck.email === email) {
                return res.status(300).send({ message: 'user already exists' });
            } else if (userCheck.userName === userName) {
                return res.status(300).send({ message: 'userName not allowed' })
            }
        }
    }
    catch (err) {
        return res.status(500).send({ message: 'server error' });
    }
}