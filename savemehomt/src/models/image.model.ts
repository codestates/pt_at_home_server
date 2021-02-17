import {Sequelize, Model, DataTypes} from 'sequelize'; 

export class images extends Model{
    public workoutId : number;
    public url : string;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof images {
    images.init(
        {
            workoutId : {
                type : DataTypes.INTEGER,
            },
            url : {
                type : DataTypes.TEXT,
            },
        },
        {
            modelName : 'images',
            tableName : 'images',
            sequelize
        }
    )
    return images;
}