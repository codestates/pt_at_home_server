import {Sequelize, Model, DataTypes} from 'sequelize';
import { routines } from './routines.model';
import { user_workouts } from './user_workouts.model';
import { workouts } from './workouts.model';

export class users extends Model{
    public id : number;
    public email : string;
    public userName : string;
    public password : string;
    public accessToken : string;
    public refreshToken : string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof users {
    users.init(
        {
            id : {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            email : {
                type : DataTypes.STRING,
            },
            userName : {
                type : DataTypes.STRING,
            },
            password : {
                type : DataTypes.STRING
            },
            accessToken : {
                type : DataTypes.STRING
            },
            refreshToken : {
                type : DataTypes.STRING
            }
        },
        {
            modelName : 'users',
            tableName : 'users',
            sequelize
        }
    )

    // users.belongsToMany(workouts, {
    //     through : user_workouts,
    //     foreignKey : 'userId'
    // })

    users.hasMany(routines, {
        foreignKey : 'userId'
    })

    return users;
}