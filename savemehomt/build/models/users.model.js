"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const sequelize_1 = require("sequelize");
const routines_model_1 = require("./routines.model");
class users extends sequelize_1.Model {
}
exports.users = users;
function default_1(sequelize) {
    users.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        userName: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING
        },
        accessToken: {
            type: sequelize_1.DataTypes.STRING
        },
        refreshToken: {
            type: sequelize_1.DataTypes.STRING
        }
    }, {
        modelName: 'users',
        tableName: 'users',
        sequelize
    });
    // users.belongsToMany(workouts, {
    //     through : user_workouts,
    //     foreignKey : 'userId'
    // })
    users.hasMany(routines_model_1.routines, {
        foreignKey: 'userId'
    });
    return users;
}
exports.default = default_1;
//# sourceMappingURL=users.model.js.map