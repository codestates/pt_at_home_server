"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.myroutine = exports.main = void 0;
var main_route_1 = require("./main.route");
Object.defineProperty(exports, "main", { enumerable: true, get: function () { return __importDefault(main_route_1).default; } });
var myworkout_route_1 = require("./myworkout.route");
Object.defineProperty(exports, "myroutine", { enumerable: true, get: function () { return __importDefault(myworkout_route_1).default; } });
var users_route_1 = require("./users.route");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return __importDefault(users_route_1).default; } });
//# sourceMappingURL=index.js.map