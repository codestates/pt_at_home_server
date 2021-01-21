const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

// ! jwt.sign(payload, secret, [options, callback])
// ! jwt.verify(token, secretOrpunlicKey, [options, callback])

// 사용자 확인
module.exports = async (req, res) => {
    if (!req.headers.authorization) { // 토큰 자체가 없음
        res.status(400).send('accessToekn not found')
    } else { // 토큰은 있음
        let token = req.headers.authorization.split(" ")[1];
        try {
            let tokenData = jwt.verify(token, ACCESS_SECRET)
            let userInfo = await users.findOne({ where: { email: tokenData.email } })
            if (token === userInfo.dataValues.accessToken) {
                res.status(200).send({
                    tokenData,
                    accessToekn: token,
                    message: 'accessToken verify'
                })
            } else { // 일치하지 않을 때
                res.status(400).send({ message: 'invalid accessToken' })
            }
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(419).send({ data: null, message: '토큰만료' })
            } else {
                res.status(401).send({data:null, message: '토큰이 유효하지 않습니다.'})
            }
        }
    }
}

// 조건
/*
1. 토큰 자체가 없을 때
2. 토큰은 있음
    1. 요청받은 토큰과 DB에 있는 토큰이 일치할 때
    2. 요청받은 토큰과 DB에 있는 토큰이 일치하지 않을 때
    3. 토큰이 만료되었을 때
*/
