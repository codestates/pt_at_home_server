import {expressTemplate} from '../../interfaces/users.interface';
import { sign,verify } from "jsonwebtoken";
import { users } from "../../models/users.model";
import axios from "axios";
import qs from 'qs';

const kakaoClientId = process.env.KAKAO_CLIENT_ID
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;

const kakao: expressTemplate = async(req,res)=>{
    try {
        const code :string = req.body.authCode;
    
        const kakaoToken:any = await axios({
          method: "POST",
          url: 'https://kauth.kakao.com/oauth/token',
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify({
            grant_type: "authorization_code",
            client_id: kakaoClientId,
            client_secret: kakaoClientSecret,
            redirect_uri: 'https://savemehomt.com/dashboard',
            code
          })
        });
    
    
        const { access_token } = kakaoToken.data;
    
    
        const userInfo = await axios({
          method: "POST",
          url: "https://kapi.kakao.com/v2/user/me",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${access_token}`
          },
          data: qs.stringify({
            property_keys: ["kakao_account.email"]
          })
        })
    
        const { properties, kakao_account } = userInfo.data;
    
        const accessToken:string = sign({
          userName: properties.nickname,
          email: kakao_account.email
        }, accessKey, {
          expiresIn: '1h'
        })
    
        const refreshToken:string = sign({
          userName: properties.nickname,
          email: kakao_account.email
        }, refreshKey, {
          expiresIn: '3h'
        })
    
        const checkUser = await users.findOne({ where: { email: kakao_account.email } });
    
        if (!checkUser) {
          await users.create({
            userName: properties.nickname,
            email: kakao_account.email,
            accessToken: kakaoToken.access_token,
            refreshToken: kakaoToken.refresh_token
          })
        }
    
        const accessVerify:any = verify(accessToken, accessKey);
        const date:Date = new Date(parseInt(accessVerify.exp) * 1000)
    
        return res.cookie('refreshToken', refreshToken, { httpOnly: true }).send({
          data: {
            id: 0,
            userName: properties.nickname,
            email: kakao_account.email,
            auth: {
              token: accessToken, expData: date
            },
          },
          message: 'auth success'
        })
      } catch (err) {
        res.status(500).send({ message: 'server error' })
      }
}

export default kakao;