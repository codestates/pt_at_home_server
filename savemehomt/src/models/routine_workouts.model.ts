import { Sequelize, DataTypes, Model } from 'sequelize';

export class routine_workouts extends Model {
    public routineId: number;
    public workoutId: number;
    public mySetCount: number;
    public myCount: number;
    public myBreakTime: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof routine_workouts {
    routine_workouts.init(
        {
            routineId: {
                allowNull: true,
                type: DataTypes.NUMBER
            },
            workoutId: {
                allowNull: true,
                type: DataTypes.NUMBER
            },
            mySetCount: {
                allowNull: true,
                type: DataTypes.NUMBER
            },
            myCount: {
                allowNull: true,
                type: DataTypes.NUMBER
            },
            myBreakTime: {
                allowNull: true,
                type: DataTypes.NUMBER
            }
        },
        {
            modelName: 'routine_workouts',
            tableName: 'routine_workouts',
            sequelize
        }
    )
    return routine_workouts;
}