import {expressTemplate} from '../../interfaces/users.interface';
import {verify,sign} from "jsonwebtoken";
import { users } from "../../models/users.model";
const ACCESS_SECRET:string = process.env.ACCESS_SECRET
const REFRESH_SECRET:string = process.env.REFRESH_SECRET

const token: expressTemplate = async(req,res)=>{
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        try {
            const refreshVerify:any = verify(req.cookies.refreshToken, REFRESH_SECRET)
            const refreshInfo = await users.findOne({ where: { email: refreshVerify.email } });
            if (req.cookies.refreshToken === refreshInfo.refreshToken) {
                const accessToken = sign({
                    id: refreshVerify.id,
                    userName: refreshVerify.userName,
                    email: refreshVerify.email
                }, ACCESS_SECRET, {
                    expiresIn: '1h'
                })
                const accessVerify:any = verify(accessToken, ACCESS_SECRET);
                const date:Date = new Date(parseInt(accessVerify.exp) * 1000)

                await users.update({ accessToken }, { where: { email: refreshInfo.email } })
                res.status(200)
                    .send({
                        data: {
                            token: accessToken,
                            expDate: date
                        },
                        message: 'accessToken verified'
                    })
            }
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(400)
                    .send({ message: 'please Login' })
            } else {
                res.status(500)
                    .send({ message: 'server error' })
            }
        }
    }
}

export default token;