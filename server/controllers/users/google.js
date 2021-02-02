
const { users } = require('../../models')
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const axios = require('axios')
const qs = require('qs')

module.exports = async (req, res) => {
    const TOKEN_URL = "https://oauth2.googleapis.com/token";
    const queryStr = qs.stringify({
        code: req.body.authCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code'
    })
    const url = TOKEN_URL + "?" + queryStr;

    try {
        const token = (await axios.post(url, null)).data;
        const userdata = (await axios.post('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token.access_token, null))

        const accessToken = jwt.sign({
            userName: userdata.data.email.split('@')[0],
            email: userdata.data.email
        }, ACCESS_SECRET, {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign({
            userName: userdata.data.email.split('@')[0],
            email: userdata.data.email
        }, REFRESH_SECRET, {
            expiresIn: '3h'
        })
        
        let userInfo = await users.findOne({
            where: { email: userdata.data.email }
        })

        if (!userInfo) {
            await users.create({
                email: userdata.data.email.split('@')[0],
                userName: userdata.data.email,
                accessToken: token.access_token,
                refreshToken: token.refresh_token
            })
        } else {
            await users.update({ accessToken: token.access_token, refreshToken: token.refresh_token }, { where: { email: userdata.data.email } })
        }

        const accessVerify = jwt.verify(accessToken, ACCESS_SECRET);
        const date = new Date(parseInt(accessVerify.exp) * 1000)

        res.status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true })
            .send({
                data: {
                    id: userInfo.dataValues.id,
                    userName: userInfo.dataValues.userName.split('@')[0],
                    email: userInfo.dataValues.email,
                    auth: {
                        token: token.access_token,
                        expDate: date
                    },
                    createdAt: userInfo.dataValues.createdAt,
                    updatedAt: userInfo.dataValues.updatedAt
                },
                message: 'auth success'
            })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'server error' })
    }
}