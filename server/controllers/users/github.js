const axios = require('axios');
const { users } = require('../../models');
const { sign , verify } = require('jsonwebtoken')
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

module.exports = async (req, res) => {

    const { authCode } = req.body
    
    const githubToken = await axios.post('https://github.com/login/oauth/access_token',
        {
            client_id : githubClientId,
            client_secret : githubClientSecret,
            code : authCode
        },
        {
            headers : {Accept : 'application/json'}
        }
    )

    const userInfo = await axios.get('https://api.github.com/user',{
        headers :{
            Accept: `application/json`,
            authorization : `token ${githubToken.data.access_token}`
        }
    });

    const { login, email } = userInfo.data;
    const userName = await users.findOne({
        where : {email : email}
    })
    
    if(!userName){
        await users.create({ userName : login, email : email })
    }

    const accessToken = sign({
        userName : login,
        email : email
    },accessKey, {
        expiresIn : '1h'
    })

    const refreshToken = sign({
        userName : login,
        email : email
    },refreshKey, {
        expiresIn : '3h'
    })

    const accessVerify = verify(accessToken, accessKey);
    const date = new Date(parseInt(accessVerify.exp) * 1000).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })

    return res.cookie('refreshToken', refreshToken, { httpOnly: true }).send({
        data : {
            id : 0,
            userName: login,
            email: email,
            auth : {
                token : accessToken, expData : date
            },  
            message : 'login success'
        }
    })
}