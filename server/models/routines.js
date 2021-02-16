'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.workouts,{
        through : models.routine_workout,
        foreignKey : 'routineId'
      })

      this.belongsTo(models.users,{
        foreignKey : 'userId',
      })
    }
  };
  routines.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'routines',
  });
  return routines;
};