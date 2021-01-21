const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken 없음' })
    } else {
        let token = req.headers.authorization.split(" ")[1];
        try {
            res.status(200)
                .cookie('accessToken', null, { httpOnly: true })
                .send({ message: 'signout success' })
        } catch (err) {
            res.status(400).send({ message: 'server error' })
        }
    }
}