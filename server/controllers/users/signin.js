const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
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
                    expiresIn: '1h'
                });

                const refreshToken = jwt.sign({
                    id: userInfo.dataValues.id,
                    userName: userInfo.dataValues.userName,
                    email: userInfo.dataValues.email
                }, REFRESH_SECRET, {
                    expiresIn: '3h'
                });

                await users.update({ accessToken, refreshToken }, { where: { email: req.body.email } })

                const accessVerify = jwt.verify(accessToken, ACCESS_SECRET);
                const date = new Date(parseInt(accessVerify.exp) * 1000)

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
            } else {
                res.status(300).send({ message: 'user not exist' })
            }
        } else {
            res.status(300).send({ message: 'user not exist' })
        }
    } catch (err) {
        res.status(500).send({ message: 'server error' })
    }
}