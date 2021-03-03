"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workout_parts = void 0;
const sequelize_1 = require("sequelize");
class workout_parts extends sequelize_1.Model {
}
exports.workout_parts = workout_parts;
function default_1(sequelize) {
    workout_parts.init({
        partId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        workoutId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    }, {
        modelName: 'workout_parts',
        tableName: 'workout_parts',
        sequelize
    });
    return workout_parts;
}
exports.default = default_1;
//# sourceMappingURL=workout_parts.model.js.map