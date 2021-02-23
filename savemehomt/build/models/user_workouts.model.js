"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_workouts = void 0;
const sequelize_1 = require("sequelize");
class user_workouts extends sequelize_1.Model {
}
exports.user_workouts = user_workouts;
function default_1(sequelize) {
    user_workouts.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        workoutId: {
            type: sequelize_1.DataTypes.INTEGER
        }
    }, {
        modelName: 'user_workouts',
        tableName: 'user_workouts',
        sequelize
    });
    return user_workouts;
}
exports.default = default_1;
//# sourceMappingURL=user_workouts.model.js.map