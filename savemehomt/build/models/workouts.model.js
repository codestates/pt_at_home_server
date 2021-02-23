"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workouts = void 0;
const sequelize_1 = require("sequelize");
const parts_model_1 = require("./parts.model");
const workout_parts_model_1 = require("./workout_parts.model");
const users_model_1 = require("./users.model");
const user_workouts_model_1 = require("./user_workouts.model");
const routines_model_1 = require("./routines.model");
const routine_workouts_model_1 = require("./routine_workouts.model");
const image_model_1 = require("./image.model");
class workouts extends sequelize_1.Model {
}
exports.workouts = workouts;
function default_1(sequelize) {
    workouts.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
        },
        instruction: {
            type: sequelize_1.DataTypes.TEXT,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
        },
        setCount: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        count: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        breakTime: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        calrorie: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        tool: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        modelName: 'workouts',
        tableName: 'workouts',
        sequelize
    });
    workouts.belongsToMany(parts_model_1.parts, {
        through: workout_parts_model_1.workout_parts,
        foreignKey: 'workoutId',
    });
    workouts.belongsToMany(users_model_1.users, {
        through: user_workouts_model_1.user_workouts,
        foreignKey: 'workoutId'
    });
    workouts.belongsToMany(routines_model_1.routines, {
        through: routine_workouts_model_1.routine_workouts,
        foreignKey: 'workoutId'
    });
    workouts.hasMany(image_model_1.images, {
        foreignKey: 'workoutId'
    });
    return workouts;
}
exports.default = default_1;
//# sourceMappingURL=workouts.model.js.map