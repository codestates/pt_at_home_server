const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const bcrypt = require('bcrypt')
// const { where } = require('sequelize/types')
const saltRounds = 10

module.exports = async (req, res) => {
    const { userName, password } = req.body

    if (!req.headers.authorization) {
        res.status(400).send({ message: 'update filed' })
    } else {
        // const authorization = req.headers.authorization;
        // const token = authorization.split(" ")[2];
        const token = req.headers.authorization.split(" ")[2];

        try {
            const tokenVerify = jwt.verify(token, ACCESS_SECRET);
            // console.log("tokenVerify: ", tokenVerify)
            if (userName && password) { // 둘 다 수정
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.update({ userName, password: hash }, { where: { email: tokenVerify.email } })
                res.status(200).send({
                    message: 'userName And Password update success'
                })
            } else if (userName) {
                await users.update({ userName }, { where: { email: tokenVerify.email } })
                res.status(200).send({
                    message: 'userName update success'
                })
            } else if (password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.update({ password: hash }, { where: { email: tokenVerify.email } })
                res.status(200).send({
                    message: 'password update success'
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).send({ err: err, message: '유효하지 않는 accessToken' })
        }
    }
}