'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  workouts.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    image: DataTypes.STRING,
    set: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    breakTime: DataTypes.INTEGER,
    calrorie: DataTypes.INTEGER,
    category: DataTypes.STRING,
    tool: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'workouts',
  });
  return workouts;
};