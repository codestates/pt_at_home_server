import {Sequelize, Model, Optional, DataTypes} from 'sequelize';
import {imageStrickMode} from '../interfaces/main.interface';

export type imageCreationAttributes =  Optional<imageStrickMode, 'workoutId' | 'url'>;

export class image extends Model<imageStrickMode, imageCreationAttributes> implements imageStrickMode{
    public workoutId : number;
    public url : string;

    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}


export default function (sequelize : Sequelize): typeof image {
    image.init(
        {
            workoutId : {
                type : DataTypes.INTEGER,
            },
            url : {
                type : DataTypes.TEXT,
            },
        },
        {
            modelName : 'image',
            tableName : 'image',
            sequelize
        }
    )
    return image;
}