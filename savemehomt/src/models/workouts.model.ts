import {Sequelize, Model, DataTypes} from 'sequelize';
import {parts} from './parts.model';
import {workout_parts} from './workout_parts.model'

export class workouts extends Model{
    public id : number;
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
            id :{
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
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
            },
        },
        {
            modelName : 'workouts',
            tableName : 'workouts',
            sequelize
        }
    )

    workouts.belongsToMany(parts, {
        through : workout_parts,
        foreignKey : 'workoutId',
    })

    return workouts
}
