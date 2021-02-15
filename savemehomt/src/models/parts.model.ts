import {Sequelize, Model, Optional, DataTypes} from 'sequelize';
import {partStrickMode} from '../interfaces/main.interface';

export type partCreationAttributes =  Optional<partStrickMode, 'part'>;

export class parts extends Model<partStrickMode, partCreationAttributes> implements partStrickMode{
    public part : string;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof parts {
    parts.init(
        {
            part : {
                type : DataTypes.INTEGER,
            },
        },
        {
            modelName : 'parts',
            tableName : 'parts',
            sequelize
        }
    )
    return parts;
}