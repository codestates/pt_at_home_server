import {Model, DataTypes} from 'sequelize'; 
import { dbType } from '.';
import {sequelize} from './sequelize';

export class user_workouts extends Model{
    public id : number;
    public userId : number;
    public workoutId : number;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


user_workouts.init(
    {
        id : {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId : {
            type : DataTypes.INTEGER,
        },
        workoutId : {
            type : DataTypes.INTEGER
        }
    },
    {
        modelName : 'user_workouts',
        tableName : 'user_workouts',
        sequelize
    }
)

export const associate = (db : dbType) => {
}

export default user_workouts
