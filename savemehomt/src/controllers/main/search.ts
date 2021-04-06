import {expressTemplate} from '../../interfaces/users.interface';
import {listType} from '../../interfaces/main.interface';
import workList from '../helper';


const search: expressTemplate = async(req,res)=>{
    const { keyword } : {keyword : string}= req.body;
    const workoutList = await workList();

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