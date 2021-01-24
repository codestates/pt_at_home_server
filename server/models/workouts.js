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
      this.belongsToMany(models.users,{
        through : models.user_workout,
        foreignKey : 'workoutId'
      })

      this.belongsToMany(models.routines,{
        through : models.routine_workout,
        foreignKey : 'workoutId'
      })

      this.belongsToMany(models.parts,{
        through : models.workout_part,
        foreignKey : 'workoutId'
      })

      this.hasMany(models.image,{
        foreignKey : 'id',
      })
    }
  };
  workouts.init({
    title: DataTypes.STRING,
    instruction: DataTypes.TEXT,
    setCount: DataTypes.INTEGER,
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