import { Model, DataTypes } from 'sequelize';
import {sequelize}  from '../src/models/database';

class Users extends Model {
    public readonly id!: number;
    public userName!: string;
    public email!: string;
    public password!: string;
    public accessToken!: string;
    public refreshToken!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Users.init(
    {
        userName : {
            type : DataTypes.STRING,
            defaultValue : 0,
        },
        email : {
            type : DataTypes.STRING,
            defaultValue : 0,
        },
        password : {
            type : DataTypes.STRING,
            defaultValue : 0,
        },
        accessToken : {
            type : DataTypes.STRING,
            defaultValue : 0,
        },
        refreshToken : {
            type : DataTypes.STRING,
            defaultValue : 0,
        }
    },
    {
        sequelize,
        modelName : 'Users',
        tableName : 'Users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
)

export default Users;