'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routine_workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  routine_workout.init({
    routineId: DataTypes.INTEGER,
    workoutId: DataTypes.INTEGER,
    workoutId: DataTypes.INTEGER,
    myCount: DataTypes.INTEGER,
    mySet: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'routine_workout',
  });
  return routine_workout;
};