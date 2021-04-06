import {Model, DataTypes} from 'sequelize';
import { dbType } from '.';
import {sequelize} from './sequelize';

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

export const associate = (db : dbType) => {
    db.users.hasMany(db.routines, {
        foreignKey : "userId"
    })
}

export default users;
