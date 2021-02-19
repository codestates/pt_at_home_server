import {expressTemplate} from '../../interfaces/users.interface';
import axios from "axios";
import { url } from "../url";

const routine: expressTemplate = async(req,res)=>{
    try {
        const recommendRoutine = await axios.get(`${url.URL}/myroutine`, {
            headers: { withCredentials: true }
        })
        res.send({ data: recommendRoutine.data.data, message: 'ok' })
    } catch (err) {
        res.status(500).send({ message: 'server error' })
    }
}

export default routine;