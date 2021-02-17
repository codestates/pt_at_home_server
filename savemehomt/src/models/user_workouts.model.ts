import { Sequelize, DataTypes, Model } from 'sequelize';

export class user_workouts extends Model {
    public userId: number;
    public workoutId: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof user_workouts {
    user_workouts.init(
        {
            userId: {
                allowNull: true,
                type: DataTypes.NUMBER
            },
            workoutId: {
                allowNull: true,
                type: DataTypes.NUMBER
            }
        },
        {
            modelName: 'user_workouts',
            tableName: 'user_workouts',
            sequelize,
        }
    )
    return user_workouts;
}