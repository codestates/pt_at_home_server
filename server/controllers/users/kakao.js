const { users } = require('../../models');
const axios = require('axios');
const { sign, verify } = require('jsonwebtoken')
const kakaoClientId = process.env.KAKAO_CLIENT_ID
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;

module.exports = async (req, res) => {
    
    const kakaoToken = await axios.post('https://kauth.kakao.com/oauth/token', 
        {
            grant_type : 'authorization_code',
            client_id : kakaoClientId,
            redirect_url : 'http://localhost:8080',
            code : req.body.authCode
        },
        {
            headers : {
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
            }
        }
    )


    const userInfo = await axios.post('https://kapi.kakao.com/v1/user/access_token_info', 
    {
        property_keys : ["kakao_account.email"]
    },
    {
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization : 'Bearer ' + kakaoToken.access_token
        }
    })

    const accessToken = sign({
        userName : userInfo.profile.nickname,
        email : userInfo.email
    }, accessKey, {
        expiresIn : '1m'
    })

    const refreshToken = sign({
        userName : userInfo.profile.nickname,
        email : userInfo.email
    }, refreshKey, {
        expiresIn : '3m'
    })

    const checkUser = await users.findOne({ where :{email : userInfo.email}});

    if(!checkUser){
        await users.create({
            userName : userInfo.profile.nicknamem,
            email : userInfo.email,
            accessToken : kakaoToken.access_token,
            refreshToken : kakaoToken.refresh_token
        })
    }

    const accessVerify = verify(accessToken, ACCESS_SECRET);
    const date = new Date(parseInt(accessVerify.exp) * 1000).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })

    return res.cookie('refreshToken', refreshToken, { httpOnly: true }).send({ 
        data : {
            id : 0,
            userName: userInfo.profile.nickname,
            email: userInfo.email,
            auth : {
                token : accessToken, expData : date
            },  
            message : 'login success'
        }
    })

}