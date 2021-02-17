import { Sequelize, DataTypes, Model } from 'sequelize';
import { UserModel } from '../models/users.model'
import { workouts } from '../models/workouts.model'
import { routine_workouts } from './routine_workouts.model';

export class routines extends Model {
    public title: string;
    public userId: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof routines {
    routines.init(
        {
            title: {
                allowNull: true,
                type: DataTypes.STRING
            },
            userId: {
                allowNull: true,
                type: DataTypes.NUMBER
            }
        },
        {
            tableName: 'routines',
            modelName: 'routines',
            sequelize,
        }
    );

    routines.belongsToMany(workouts, {
        through: routine_workouts,
        foreignKey: 'routineId'
    })

    routines.belongsTo(UserModel, {
        foreignKey: 'userId'
    })

    return routines;
}