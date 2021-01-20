const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET


module.exports = async (req, res) => {
    let userInfo = await users.findOne({
        where: { email: req.body.email }
    })

    if (!userInfo) {
        res.status(400).send({ message: 'user not exist' })
    } else {
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
            expiresIn: '1h'
        });

        await users.update({ accessToken, refreshToken }, { where: { email: req.body.email } })
        res.status(200)
            .cookie({ accessToken, refreshToken }, { httpOnly: true })
            .send({
                data: {
                    id: userInfo.dataValues.id,
                    userName: userInfo.dataValues.userName,
                    email: userInfo.dataValues.email
                }, accessToken,
                message: 'signin success'
            })
    }

}

// JWT 인증방식
// 1. 브라우저 -> Login 요청
// 2. 서버에서 -> JWT 발급하여 -> 브라우저로 응답
// 3. 이 후 요청시에는 발급받은 JWT를 같이 보낸다.
// 4. 서버에서 요청받은 JWT를 확인하고 유저정보를 request에 담아준다?
// 5. 서버에서 브라우저의 요청을 처리하고 response로 보낸다.
