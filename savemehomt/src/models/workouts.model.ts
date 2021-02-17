import {Sequelize, Model, DataTypes} from 'sequelize';
import {parts} from './parts.model';
import {workout_parts} from './workout_parts.model';
import { users } from "./users.model";
import { user_workouts } from "./user_workouts.model";
import { routines } from "./routines.model";
import { routine_workouts } from "./routine_workouts.model";
import { images } from './image.model';

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

    workouts.belongsToMany(users, {
        through : user_workouts,
        foreignKey : 'workoutId'
    })

    workouts.belongsToMany(routines, {
        through : routine_workouts,
        foreignKey : 'workoutId'
    })

    workouts.hasMany(images,{
        foreignKey : 'workoutId'
    })

    return workouts
}
