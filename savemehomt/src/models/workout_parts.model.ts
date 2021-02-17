import {Sequelize, Model, DataTypes} from 'sequelize';


export class workout_parts extends Model{
    public partId : number;
    public workoutId : number;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof workout_parts {
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

    return workout_parts;
}
