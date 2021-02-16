'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_workout.init({
    userId: DataTypes.INTEGER,
    workoutId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_workout',
  });
  return user_workout;
};