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
        let token = req.headers.authorization.split(" ")[2];
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
                let tokenData = jwt.verify(token, ACCESS_SECRET);
                let userInfo = await users.findOne({ where: { email: tokenData.email } })
                if (tokenData !== userInfo.dataValues.email) {
                    res.status(419).send({ message: 'accessToken 불일치' })
                } else if (!req.cookies.refreshToken) {
                    res.status(419).send({ message: 'refreshToken 없음' })
                } else if (req.cookies.refreshToken !== userInfo.dataValues.refreshToken) {
                    res.status(419).send({ message: 'refreshTkoen 불일치' })
                } else {
                    try {
                        jwt.verify(req.cookies.refreshToken, REFRESH_SECRET);
                        const accessToekn = jwt.sign({
                            id: tokenData.id,
                            userName: tokenData.userName,
                            email: tokenData.email
                        })
                        await userInfo.update({ accessToekn }, { where: { email: tokenData.email } })
                        res.send(200).send({
                            tokenData,
                            accessToekn,
                            message: 'accessToken 재발급'
                        })
                    } catch (err) {
                        await userInfo.update({ refreshToken: null }, { where: { email: tokenData.email } })
                        res.status(400)
                            .cookie('refreshToken', null, { httpOnly: true })
                            .send({ message: 'refreshToekn 만료. 다시 로그인 해주세요' })
                    }
                }
                // res.status(419).send({ data: null, message: '토큰만료' })
            } else {
                res.status(401).send({ data: null, message: '토큰이 유효하지 않습니다.' })
            }
        }
    }
}
