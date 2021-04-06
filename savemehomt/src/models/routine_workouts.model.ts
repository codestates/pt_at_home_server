import {Sequelize, Model, DataTypes} from 'sequelize';
import { dbType } from '.';
import {sequelize} from './sequelize';

export class routine_workouts extends Model{
    public routineId : number;
    public workoutId : number;
    public myCount : number;
    public mySetCount : number;
    public myBreakTime : number;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


routine_workouts.init(
    {
        routineId : {
            type : DataTypes.INTEGER,
        },
        workoutId : {
            type : DataTypes.INTEGER,
        },
        myCount : {
            type : DataTypes.INTEGER,
        },
        mySetCount : {
            type : DataTypes.INTEGER,
        },
        myBreakTime : {
            type : DataTypes.INTEGER,
        }
    },
    {
        modelName : 'routine_workouts',
        tableName : 'routine_workouts',
        sequelize
    }
)
export const associate = (db : dbType) => {
}

export default routine_workouts

    