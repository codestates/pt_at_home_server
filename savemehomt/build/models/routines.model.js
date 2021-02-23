"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routines = void 0;
const sequelize_1 = require("sequelize");
class routines extends sequelize_1.Model {
}
exports.routines = routines;
function default_1(sequelize) {
    routines.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
        }
    }, {
        modelName: 'routines',
        tableName: 'routines',
        sequelize
    });
    return routines;
}
exports.default = default_1;
//# sourceMappingURL=routines.model.js.map