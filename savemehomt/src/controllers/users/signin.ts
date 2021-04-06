import {expressTemplate} from '../../interfaces/users.interface';
import bcrypt from 'bcrypt';
import {users} from '../../models/index';
import { sign, verify } from 'jsonwebtoken'
import {signType} from '../../interfaces/users.interface'
require('dotenv').config();

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const signin: expressTemplate = async(req,res)=>{
    try {
        const userInfo:signType = await users.findOne({ where: { email: req.body.email }, raw : true });
        const checkPassword:boolean = await bcrypt.compare(req.body.password, userInfo.password)

        if (checkPassword) {
            if (req.body.email === userInfo.email) {
                
                const accessToken:string = sign({
                    id: userInfo.id,
                    userName: userInfo.userName,
                    email: userInfo.email
                }, ACCESS_SECRET, {
                    expiresIn: '1h'
                });

                const refreshToken:string = sign({
                    id: userInfo.id,
                    userName: userInfo.userName,
                    email: userInfo.email
                }, REFRESH_SECRET, {
                    expiresIn: '3h'
                });
                
                await users.update({ accessToken, refreshToken }, { where: { email: req.body.email } })

                const accessVerify:any = verify(accessToken, ACCESS_SECRET);
                const date:Date = new Date(parseInt(accessVerify.exp) * 1000)

                res.status(200)
                    .cookie('refreshToken', refreshToken, { httpOnly: true })
                    .send({
                        data: {
                            id: userInfo.id,
                            userName: userInfo.userName,
                            email: userInfo.email,
                            auth: {
                                token: accessToken,
                                expDate: date,
                            },
                            createdAt: userInfo.createdAt,
                            updatedAt: userInfo.updatedAt
                        },
                        message: 'signin success'
                    })
            } else {
                res.status(300).send({ message: 'user not exist' })
            }
        } else {
            res.status(300).send({ message: 'user not exist' })
        }
    } catch (err) {
        res.status(500).send({ message: 'server error' })
    }
}

export default signin;