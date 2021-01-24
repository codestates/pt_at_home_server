const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment');
require('moment-timezone')

module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    }
    else {
        try {
            const userInfo = await users.findOne({ where: { email: req.body.email } });
            const checkPassword = await bcrypt.compare(req.body.password, userInfo.password)

            if (checkPassword) {
                if (req.body.email === userInfo.email) {

                    const accessToken = jwt.sign({
                        id: userInfo.dataValues.id,
                        userName: userInfo.dataValues.userName,
                        email: userInfo.dataValues.email
                    }, ACCESS_SECRET, {
                        expiresIn: '1m'
                    });

                    const refreshToken = jwt.sign({
                        id: userInfo.dataValues.id,
                        userName: userInfo.dataValues.userName,
                        email: userInfo.dataValues.email
                    }, REFRESH_SECRET, {
                        expiresIn: '3m'
                    });

                    await users.update({ accessToken, refreshToken }, { where: { email: req.body.email } })

                    const accessVerify = jwt.verify(accessToken, ACCESS_SECRET);
                    const date = new Date(parseInt(accessVerify.exp) * 1000).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })

                    res.status(200)
                        .cookie('refreshToken', refreshToken, { httpOnly: true })
                        .send({
                            data: {
                                id: userInfo.dataValues.id,
                                userName: userInfo.dataValues.userName,
                                email: userInfo.dataValues.email,
                                auth: {
                                    token: accessToken,
                                    expDate: date,
                                },
                                createdAt: userInfo.dataValues.createdAt,
                                updatedAt: userInfo.dataValues.updatedAt
                            },
                            message: 'signin success'
                        })
                }
            } else {
                res.status(400).send({ message: 'user not exist' })
            }
        } catch (err) {
            res.status(500).send({ message: 'server error' })
        }
    }
}