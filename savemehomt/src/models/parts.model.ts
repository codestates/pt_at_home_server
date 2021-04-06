import {Sequelize, Model, DataTypes} from 'sequelize';
import { dbType } from '.';
import {sequelize} from './sequelize';

export class parts extends Model{
    public part : string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


parts.init(
    {
        part : {
            type : DataTypes.STRING,
        },
    },
    {
        modelName : 'parts',
        tableName : 'parts',
        sequelize
    }
)

export const associate = (db : dbType) => {
    db.parts.belongsToMany(db.workouts, {
        through : db.workout_parts,
        foreignKey : 'partId'
    })

}

export default parts
