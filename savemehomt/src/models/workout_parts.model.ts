import {Model, DataTypes} from 'sequelize';
import { dbType } from '.';
import {sequelize} from './sequelize';


export class workout_parts extends Model{
    public partId : number;
    public workoutId : number;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


workout_parts.init(
    {
        partId : {
            type : DataTypes.INTEGER,
        },
        workoutId : {
            type : DataTypes.INTEGER,
        },
    },
    {
        modelName : 'workout_parts',
        tableName : 'workout_parts',
        sequelize
    }
)


export const associate = (db : dbType) => {
}

export default workout_parts
