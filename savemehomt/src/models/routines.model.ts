import {Sequelize, Model, DataTypes} from 'sequelize';
import { routine_workouts } from './routine_workouts.model';
import { workouts } from './workouts.model';

export class routines extends Model{
    public title : string;
    public userId : string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof routines {
    routines.init(
        {
            title : {
                type : DataTypes.STRING,
            },
            userId : {
                type : DataTypes.STRING,
            }
        },
        {
            modelName : 'routines',
            tableName : 'routines',
            sequelize
        }
    )

    // routines.belongsToMany(workouts, {
    //     through : routine_workouts,
    //     foreignKey : 'routineId'
    // })

    return routines;
}