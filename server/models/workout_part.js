'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workout_part extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  workout_part.init({
    partId: DataTypes.INTEGER,
    workoutId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workout_part',
  });
  return workout_part;
};