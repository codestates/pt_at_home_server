import {expressTemplate} from '../../interfaces/users.interface';
import { verify,sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../../models/index";

require('dotenv').config();
const ACCESS_SECRET:string = process.env.ACCESS_SECRET;
const saltRounds:number= 10


const update: expressTemplate = async(req,res)=>{
    const { userName, password } = req.body
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        const token = req.headers.authorization.substr(7);
        try {
            const tokenVerify:any = verify(token, ACCESS_SECRET);
            const date:Date = new Date(parseInt(tokenVerify.exp) * 1000)
            if (userName && password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.update({ userName, password: hash }, { where: { email: tokenVerify.email } })
                const userInfo = await users.findOne({ where: { email: tokenVerify.email } })
                res.status(200)
                    .send({
                        data: {
                            id: userInfo.id,
                            userName: userInfo.userName,
                            email: userInfo.email,
                            auth: {
                                token: token,
                                expDate: date
                            }
                        },
                        message: 'userName And Password update success'
                    })
            } else if (userName) {
                await users.update({ userName }, { where: { email: tokenVerify.email } })
                const userInfo = await users.findOne({ where: { email: tokenVerify.email } })
                res.status(200)
                    .send({
                        data: {
                            id: userInfo.id,
                            userName: userInfo.userName,
                            email: userInfo.email,
                            auth: {
                                token: token,
                                expDate: date
                            }
                        },
                        message: 'userName update success'
                    })
            } else if (password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.update({ password: hash }, { where: { email: tokenVerify.email } })
                const userInfo = await users.findOne({ where: { email: tokenVerify.email } })
                res.status(200)
                    .send({
                        data: {
                            id: userInfo.id,
                            userName: userInfo.userName,
                            email: userInfo.email,
                            auth: {
                                token: token,
                                expDate: date
                            }
                        },
                        message: 'password update success'
                    })
            } else {
                res.status(300).send({ message: 'update failed' })
            }
        } catch (err) {
            res.status(500).send({ message: 'server error' })
        }
    }
}

export default update;