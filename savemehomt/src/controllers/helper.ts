import {workouts, images, parts} from '../models/index'

const workList = async() =>{
    const workoutsData = await workouts.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        include: [
            {
                model: images,
                as : "image",
                attributes: ['url'],
            },
            {
                model: parts,
                attributes: ['part'],
            },
        ],
    });
    
    const resultData = workoutsData.map((workout: any) => {
        workout.dataValues.image = workout.dataValues.image.map((image) => {
            return image.url;
        });
        workout.dataValues.parts = workout.dataValues.parts.map((part) => {
            return part.part;
        });
        return workout.dataValues;
    });

    return resultData
}

export default workList;
