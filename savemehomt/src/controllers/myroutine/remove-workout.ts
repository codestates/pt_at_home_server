import {expressTemplate} from '../../interfaces/users.interface';
import { verify } from "jsonwebtoken";
import {users , user_workouts} from '../../models/index';
import { Op } from "sequelize";
import { url } from "../url";

require('dotenv').config();
const accessKey:string = process.env.ACCESS_SECRET;

const removeWorkout: expressTemplate = async(req,res)=>{

    try {
        const { workoutId } : {workoutId:number} = req.body;

        const userInfoInToken:string = req.headers.authorization.substr(7);
        const checkToken:any = verify(userInfoInToken, accessKey);

        const _userId = await users.findOne({
            attributes: ['id'],
            where: { email: checkToken.email },
            raw : true
        })

        await user_workouts.destroy({
            where: {
                [Op.and]: [
                    { userId: _userId.id },
                    { workoutId: workoutId }
                ]
            }
        });

        return res.redirect(`${url.URL}/myroutine/myworkout`);
    } catch (err) {
        return res.status(500).send('server error');
    }
}

export default removeWorkout;
