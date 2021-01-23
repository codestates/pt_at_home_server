const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send('accessToken not found')
    } else {
        let token = req.headers.authorization.split(" ")[2];

        try {
            let tokenData = jwt.verify(token, ACCESS_SECRET)
            let userInfo = await users.findOne({ where: { email: tokenData.email } })
            const date = new Date(parseInt(tokenData.exp) * 1000).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
            if (token === userInfo.dataValues.accessToken) {
                res.status(200).send({
                    data: {
                        token: token,
                        exp: date
                    },
                    message: 'accessToken verified'
                })
            }
        } catch (err) {
            if (err.name === 'TokenExpiredError') { // accessToken 만료
                try {
                    const refreshVerify = jwt.verify(req.cookies.refreshToken, REFRESH_SECRET)
                    const refreshInfo = await users.findOne({ where: { email: refreshVerify.email } });

                    if (req.cookies.refreshToken === refreshInfo.dataValues.refreshToken) {
                        const accessToken = jwt.sign({
                            id: refreshVerify.id,
                            userName: refreshVerify.userName,
                            email: refreshVerify.email
                        }, ACCESS_SECRET, {
                            expiresIn: '2m'
                        })

                        const refreshToken = jwt.sign({
                            id: refreshVerify.id,
                            userName: refreshVerify.userName,
                            email: refreshVerify.email
                        }, REFRESH_SECRET, {
                            expiresIn: '3m'
                        })

                        await users.update({ accessToken, refreshToken }, { where: { email: refreshInfo.email } })

                        res.status(401)
                            .send({
                                data: {
                                    accessToken, refreshToken
                                },
                                message: 'accessToken expired. Renew accessToken And refreshToken'
                            })
                    }
                } catch (err) {
                    res.status(400)
                        .send({
                            message: 'refreshToken expired. please Login'
                        })
                }
            } else {
                res.status(400).send({ message: 'invalid accessToken' })
            }
        }
    }
}