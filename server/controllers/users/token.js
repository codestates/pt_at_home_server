const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        try {
            const refreshVerify = jwt.verify(req.cookies.refreshToken, REFRESH_SECRET)
            const refreshInfo = await users.findOne({ where: { email: refreshVerify.email } });
            if (req.cookies.refreshToken === refreshInfo.dataValues.refreshToken) {
                const accessToken = jwt.sign({
                    id: refreshVerify.id,
                    userName: refreshVerify.userName,
                    email: refreshVerify.email
                }, ACCESS_SECRET, {
                    expiresIn: '1h'
                })
                const accessVerify = jwt.verify(accessToken, ACCESS_SECRET);
                const date = new Date(parseInt(accessVerify.exp) * 1000)

                await users.update({ accessToken }, { where: { email: refreshInfo.email } })
                res.status(200)
                    .send({
                        data: {
                            token: accessToken,
                            expDate: date
                        },
                        message: 'accessToken verified'
                    })
            }
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(400)
                    .send({ message: 'please Login' })
            } else {
                res.status(500)
                    .send({ message: 'server error' })
            }
        }
    }
}

