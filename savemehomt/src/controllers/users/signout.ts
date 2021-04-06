import {expressTemplate} from '../../interfaces/users.interface';
import { verify, sign } from "jsonwebtoken";
import { users } from "../../models/index";

const ACCESS_SECRET:string = process.env.ACCESS_SECRET

const signout: expressTemplate = async(req,res)=>{
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        const token = req.headers.authorization.substr(7);
        try {
            const tokenVerify:any = verify(token, ACCESS_SECRET);
            let userInfo = await users.findOne({
                where: { email: tokenVerify.email }
            })

            if (tokenVerify.email === userInfo.email) {
                await users.update({ accessToken: null, refreshToken: null },
                    { where: { email: tokenVerify.email } })
            }

            res.status(200)
                .cookie('accessToken', null, { httpOnly: true })
                .send({ message: 'signout success' })
        } catch (err) {
            res.status(500).send({ message: 'server error' })
        }
    }
}

export default signout;