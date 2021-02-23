"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routine_workouts = void 0;
const sequelize_1 = require("sequelize");
class routine_workouts extends sequelize_1.Model {
}
exports.routine_workouts = routine_workouts;
function default_1(sequelize) {
    routine_workouts.init({
        routineId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        workoutId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        myCount: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        mySetCount: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        myBreakTime: {
            type: sequelize_1.DataTypes.INTEGER,
        }
    }, {
        modelName: 'routine_workouts',
        tableName: 'routine_workouts',
        sequelize
    });
    return routine_workouts;
}
exports.default = default_1;
//# sourceMappingURL=routine_workouts.model.js.map