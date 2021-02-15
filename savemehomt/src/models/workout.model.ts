import {Sequelize, Model, Optional, DataTypes} from 'sequelize';
import {workoutStrickMode} from '../interfaces/main.interface';

export type workoutCreationAttributes = 
Optional<workoutStrickMode, 
'title' | 'instruction' | 'setCount' | 'count' | 'breakTime' | 'calrorie' | 'category' | 'tool'>;

export class workouts extends Model<workoutStrickMode, workoutCreationAttributes> implements workoutStrickMode{
    public title : string;
    public instruction : string;
    public setCount : number;
    public count : number;
    public category : string;
    public breakTime : number;
    public calrorie : number;
    public tool : string;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}

export default function (sequelize : Sequelize): typeof workouts {
    workouts.init(
        {
            title : {
                type : DataTypes.STRING,
            },
            instruction : {
                type : DataTypes.TEXT,
            },
            category : {
                type : DataTypes.STRING,
            },
            setCount : {
                type : DataTypes.INTEGER,
            },
            count : {
                type : DataTypes.INTEGER,
            },
            breakTime : {
                type : DataTypes.INTEGER,
            },
            calrorie : {
                type : DataTypes.INTEGER,
            },
            tool : {
                type : DataTypes.STRING,
            }
        },
        {
            modelName : 'workouts',
            tableName : 'workouts',
            sequelize
        }
    )
    return workouts;
}