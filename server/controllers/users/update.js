const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = async (req, res) => {
    const { userName, password } = req.body
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        const token = req.headers.authorization.substr(7);
        console.log()
        try {
            const tokenVerify = jwt.verify(token, REFRESH_SECRET);
            const date = new Date(parseInt(tokenVerify.exp) * 1000)
            if (userName && password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.update({ userName, password: hash }, { where: { email: tokenVerify.email } })
                const userInfo = await users.findOne({ where: { email: tokenVerify.email } })
                res.status(200)
                    .send({
                        data: {
                            id: userInfo.dataValues.id,
                            userName: userInfo.dataValues.userName,
                            email: userInfo.dataValues.email,
                            auth: {
                                token: token,
                                expDate: date
                            }
                        },
                        message: 'userName And Password update success'
                    })
            } else if (userName) {
                await users.update({ userName }, { where: { email: tokenVerify.email } })
                const userInfo = await users.findOne({ where: { email: tokenVerify.email } })
                res.status(200)
                    .send({
                        data: {
                            id: userInfo.dataValues.id,
                            userName: userInfo.dataValues.userName,
                            email: userInfo.dataValues.email,
                            auth: {
                                token: token,
                                expDate: date
                            }
                        },
                        message: 'userName update success'
                    })
            } else if (password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.update({ password: hash }, { where: { email: tokenVerify.email } })
                const userInfo = await users.findOne({ where: { email: tokenVerify.email } })
                res.status(200)
                    .send({
                        data: {
                            id: userInfo.dataValues.id,
                            userName: userInfo.dataValues.userName,
                            email: userInfo.dataValues.email,
                            auth: {
                                token: token,
                                expDate: date
                            }
                        },
                        message: 'password update success'
                    })
            } else {
                res.status(400).send({ message: 'update failed' })
            }
        } catch (err) {
            console.log(err)
            console.log()
            res.status(500).send({ message: 'server error' })
        }
    }
}