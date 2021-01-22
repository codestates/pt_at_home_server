'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('routine_workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routineId: {
        type: Sequelize.INTEGER
      },
      workoutId: {
        type: Sequelize.INTEGER
      },
      workoutId: {
        type: Sequelize.INTEGER
      },
      myCount: {
        type: Sequelize.INTEGER
      },
      mySet: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('routine_workouts');
  }
};