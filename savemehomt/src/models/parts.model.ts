import {Sequelize, Model, DataTypes} from 'sequelize';

export class parts extends Model{
    public part : string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof parts {
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

    return parts;
}
