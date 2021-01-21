const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req, res) => {
    const userInfo = await users.findOne({ where: { email: req.body.email } });
    const checkPassword = await bcrypt.compare(req.body.password, userInfo.password)

    if (checkPassword) {
        if(req.body.email === userInfo.email){
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
            res.status(200)
                .cookie({ refreshToken }, { httpOnly: true })
                .send({
                    data: {
                        id: userInfo.dataValues.id,
                        userName: userInfo.dataValues.userName,
                        email: userInfo.dataValues.email
                    }, accessToken,
                    message: 'signin success'
                })
        }
    } else {
        res.status(400).send({ message: 'user not exist' })
    }
}