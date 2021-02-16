const { users } = require('../../models');
const { sign, verify } = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET
require('dotenv').config();

module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        const token = req.headers.authorization.substr(7);
        try {
            const tokenVerify = verify(token, ACCESS_SECRET);
            console.log(tokenVerify)
            let userInfo = await users.findOne({
                where: { email: tokenVerify.email }
            })

            if (tokenVerify.email === userInfo.email) {
                await users.update({ accessToken: null, refreshToken: null },
                    { where: { email: tokenVerify.email } })
            }

            res.status(200)
                .cookie('accessToken', null, { httpOnly: true })
                .send({ message: 'signout success' })
        } catch (err) {
            res.status(500).send({ message: 'server error' })
        }
    }
}