import {Model, DataTypes} from 'sequelize';;
import { dbType } from '.';
import {sequelize} from './sequelize';


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

export const associate = (db : dbType) => {
    db.workouts.belongsToMany(db.parts, {
        through : db.workout_parts,
        foreignKey : 'workoutId'
    })

    db.workouts.belongsToMany(db.users, {
        through : db.user_workouts,
        foreignKey : 'workoutId'
    })

    db.workouts.belongsToMany(db.routines, {
        through : db.routine_workouts,
        foreignKey : 'workoutId'
    })

    db.workouts.hasMany(db.images, {
        foreignKey : 'workoutId',
        as : "image"
    })
}

export default workouts