import {expressTemplate} from '../../interfaces/users.interface';
import {workouts} from '../../models/workouts.model'
import {images} from '../../models/image.model'
import {parts} from '../../models/parts.model'

const main: expressTemplate = async(req,res)=>{
    try {
        const workoutData = await workouts.findAll({
            attributes: [
                'id', 'title', 'instruction',
                'setCount', 'count', 'breakTime',
                'calrorie', 'category', 'tool'],
            raw: true,
        })



        const _url = await images.findAll({
            attributes: ['url', 'workoutId'],
            raw: true,
        })


        const _parts = await workouts.findAll({
            attributes: ['id'],
            include: { model: parts },
            raw: true,
        })

        const result = workoutData.map((data:any, index: number) => {
            data.url = new Array;
            data.parts = new Array
            
            _url.forEach(el => {
                if (el.workoutId === index + 1) {
                    data.url.push(el.url);
                }
            })
            _parts.forEach(part=>{
                if(data.id === part.id){
                    data.parts.push(part['parts.part'])
                }
            })
            return data;
        })

        res.send({ data: result, message: 'ok' });
    } catch (err) {
        res.status(500).send({ message: 'server error' })
    }

}

export default main;