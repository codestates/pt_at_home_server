import {Sequelize, Model, DataTypes} from 'sequelize';
import { routine_workouts } from './routine_workouts.model';
import { workouts } from './workouts.model';

export class routines extends Model{
    public id : number;
    public title : string;
    public userId : string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof routines {
    routines.init(
        {
            id : {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
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

    return routines;
}