import {Sequelize, Model, Optional, DataTypes} from 'sequelize';
import {workoutPartStrickMode} from '../interfaces/main.interface';

export type workoutPartCreationAttributes =  Optional<workoutPartStrickMode, 'partId' | 'workoutId'>;

export class workout_part extends Model<workoutPartStrickMode, workoutPartCreationAttributes> implements workoutPartStrickMode{
    public partId : number;
    public workoutId : number;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof workout_part {
    workout_part.init(
        {
            partId : {
                type : DataTypes.INTEGER,
            },
            workoutId : {
                type : DataTypes.INTEGER,
            },
        },
        {
            modelName : 'workout_part',
            tableName : 'workout_part',
            sequelize
        }
    )
    return workout_part;
}