import {Sequelize, Model, DataTypes} from 'sequelize'; 
import { dbType } from '.';
import {sequelize} from './sequelize';

export class images extends Model{
    public workoutId : number;
    public url : string;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


images.init(
    {
        workoutId : {
            type : DataTypes.INTEGER,
        },
        url : {
            type : DataTypes.TEXT,
        },
    },
    {
        modelName : 'images',
        tableName : 'images',
        sequelize
    }
)

export const associate = (db : dbType) => {
}

export default images