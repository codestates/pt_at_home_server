import {expressTemplate, userType} from '../../interfaces/users.interface';
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { users } from "../../models/users.model";
require('dotenv').config();

const saltRounds = 10;
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;

const {
    ACCESS_SECRET
} = process.env;

const signup: expressTemplate = async(req,res)=>{
    const { email, password, userName } : userType = req.body

    const userCheck = await users.findOne({ where: { email: email } })

    // try {
        if (!userCheck) {
            const userInfo = { email: email, userName: userName }

            console.log(ACCESS_SECRET);

            const accessToken = sign(userInfo, accessKey,
                {
                    expiresIn: '10h'
                })

                console.log(accessToken)

            const refreshToken = sign(userInfo, refreshKey,
                {
                    expiresIn: '10h'
                })
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const result = await users.create(
                {
                    email: email,
                    password: hashPassword,
                    userName: userName,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    raw: true,
                },
            );

            console.log(result);

    //         const accessVerify:any = verify(accessToken, accessKey);
    //         const date = new Date(parseInt(accessVerify.exp) * 1000)
    //         result.dataValues.auth = {
    //             token: result.accessToken,
    //             expDate: date
    //         }

    //         delete result.dataValues.refreshToken
    //         delete result.dataValues.accessToken

    //         return res.cookie('refreshToken', refreshToken,
    //             {
    //                 httpOnly: true,
    //             }
    //         ).send({ data: result, message: 'signup success' })
    //     } else {
    //         if (userCheck.email === email) {
    //             return res.status(300).send({ message: 'user already exists' });
    //         } else if (userCheck.userName === userName) {
    //             return res.status(300).send({ message: 'userName not allowed' })
    //         }
    //     }
    // }
    // catch (err) {
    //     return res.status(500).send({ message: 'server error' });
    // }
    }
}

export default signup;