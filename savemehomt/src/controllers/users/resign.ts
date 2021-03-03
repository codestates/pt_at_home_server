import { verify } from 'jsonwebtoken';
import {expressTemplate} from '../../interfaces/users.interface';
import { routines } from '../../models/routines.model';
import { routine_workouts } from '../../models/routine_workouts.model';
import { users } from "../../models/users.model";
import { user_workouts } from '../../models/user_workouts.model';

const accessKey = process.env.ACCESS_SECRET;

const resign: expressTemplate = async(req,res)=>{
    const { email } = req.body
    const userInfoInToken:string = req.headers.authorization.substr(7);
    const checkToken:any = verify(userInfoInToken, accessKey);
    const checkUser = await users.findOne({ where: { email: email } });

    try {
        if (checkUser.email === checkToken.email) {
            const routineId = await routines.findAll({where : {userId : checkUser.id}});
            routineId.map(async(routine)=>{
                await routine_workouts.destroy({where : { routineId : routine.id }})
            })
            await routines.destroy({where : {userId : checkUser.id}})
            await user_workouts.destroy({where : {userId : checkUser.id}})
            await users.destroy({ where: { email: email } });
            res.clearCookie('refreshToken').send({ message: 'resign success' });
        } else {
            return res.status(400).send({ message: 'cannot verified' });
        }
    }
    catch (err) {
        return res.status(500).send({ message: 'server error' })
    }
}

export default resign;