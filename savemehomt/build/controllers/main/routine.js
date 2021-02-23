"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url_1 = require("../url");
const routine = async (req, res) => {
    try {
        const recommendRoutine = await axios_1.default.get(`${url_1.url.URL}/myroutine`, {
            headers: { withCredentials: true }
        });
        res.send({ data: recommendRoutine.data.data, message: 'ok' });
    }
    catch (err) {
        res.status(500).send({ message: 'server error' });
    }
};
exports.default = routine;
//# sourceMappingURL=routine.js.map