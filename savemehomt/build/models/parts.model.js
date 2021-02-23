"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parts = void 0;
const sequelize_1 = require("sequelize");
class parts extends sequelize_1.Model {
}
exports.parts = parts;
function default_1(sequelize) {
    parts.init({
        part: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        modelName: 'parts',
        tableName: 'parts',
        sequelize
    });
    return parts;
}
exports.default = default_1;
//# sourceMappingURL=parts.model.js.map