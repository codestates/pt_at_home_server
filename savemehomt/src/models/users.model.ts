import { Sequelize, DataTypes, Model } from 'sequelize';
import { workouts } from '../models/workouts.model';
import { routines } from '../models/routines.model'
import { user_workouts } from './user_workouts.model';

export class UserModel extends Model {
  public id: number;
  public userName: string;
  public email: string;
  public password: string;
  public accessToken: Text;
  public refreshToken: Text;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      userName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accessToken: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.TEXT
      }
    },
    {
      modelName: 'UserModel',
      tableName: 'users',
      sequelize,
    },
  );

  // UserModel.hasMany(Routines, { foreignKey: 'id' })
  UserModel.hasMany(routines, {
    foreignKey: 'id'
  })

  UserModel.belongsToMany(workouts, {
    through: user_workouts,
    foreignKey: 'userId'
  })
  
  return UserModel;
}
