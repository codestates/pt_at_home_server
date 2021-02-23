"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const image_model_1 = __importDefault(require("../models/image.model"));
const parts_model_1 = __importDefault(require("../models/parts.model"));
const workouts_model_1 = __importDefault(require("../models/workouts.model"));
const workout_parts_model_1 = __importDefault(require("../models/workout_parts.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const user_workouts_model_1 = __importDefault(require("../models/user_workouts.model"));
const routines_model_1 = __importDefault(require("../models/routines.model"));
const routine_workouts_model_1 = __importDefault(require("../models/routine_workouts.model"));
const env = process.env.NODE_ENV || 'development';
const sequelize = new sequelize_1.Sequelize(config_1.default[env].database, config_1.default[env].username, config_1.default[env].password, {
    host: config_1.default[env].host,
    dialect: config_1.default[env].dialect,
    timezone: '+09:00',
    pool: config_1.default[env].pool,
    logQueryParameters: env === 'development',
    benchmark: true,
});
const DB = {
    routine_workouts: routine_workouts_model_1.default(sequelize),
    routines: routines_model_1.default(sequelize),
    user_workouts: user_workouts_model_1.default(sequelize),
    users: users_model_1.default(sequelize),
    parts: parts_model_1.default(sequelize),
    workout_parts: workout_parts_model_1.default(sequelize),
    image: image_model_1.default(sequelize),
    workouts: workouts_model_1.default(sequelize),
    sequelize,
    Sequelize: // connection instance (RAW queries)
    sequelize_1.Sequelize,
};
exports.default = DB;
//# sourceMappingURL=index.js.map