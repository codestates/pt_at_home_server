"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const sequelize_1 = require("sequelize");
class images extends sequelize_1.Model {
}
exports.images = images;
function default_1(sequelize) {
    images.init({
        workoutId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        url: {
            type: sequelize_1.DataTypes.TEXT,
        },
    }, {
        modelName: 'images',
        tableName: 'images',
        sequelize
    });
    return images;
}
exports.default = default_1;
//# sourceMappingURL=image.model.js.map