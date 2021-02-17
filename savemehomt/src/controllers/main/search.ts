import {expressTemplate} from '../../interfaces/users.interface';
import axios from 'axios';
import {url} from '../url';
import {listType} from '../../interfaces/main.interface';


const search: expressTemplate = async(req,res)=>{
    const { keyword } : {keyword : string}= req.body;

    const data = await axios.get(`${url.URL}/main`,
        { headers: { withCredentials: true } });

    const workoutList: Array<listType> = data.data.data;

    try {
        const filterData: Array<listType> = workoutList.filter(workout => {
            if (workout.category === keyword) {
                return true;
            }
            if (workout.title === keyword) {
                return true
            }
            if (workout.parts.includes(keyword)) {
                return true;
            }
            if (workout.tool === keyword) {
                return true;
            }
        })

        if (filterData.length === 0) {
            return res.status(300).send({ data: [], message: 'not found' });
        }
        return res.send({ data: filterData, message: 'ok' })
    } catch (err) {
        return res.status(500).send({ message: "server error" });
    }

}

export default search;