import {expressTemplate} from '../../interfaces/users.interface';
import { routines } from "../../models/routines.model";
import { routine_workouts } from "../../models/routine_workouts.model";
import { url } from "../url";

const deleteRoutine: expressTemplate = async(req,res)=>{
    try {
        const { routineId } : {routineId : number}= req.body
        await routines.destroy({ where: { id: routineId } });

        await routine_workouts.destroy({ where: { routineId: routineId } });

        res.redirect(`${url.URL}/myroutine`)

    } catch (err) {
        res.status(500).send('server error')
    }
}

export default deleteRoutine;

