"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url_1 = require("../url");
const search = async (req, res) => {
    const { keyword } = req.body;
    const data = await axios_1.default.get(`${url_1.url.URL}/main`, { headers: { withCredentials: true } });
    const workoutList = data.data.data;
    try {
        const filterData = workoutList.filter(workout => {
            if (workout.category === keyword) {
                return true;
            }
            if (workout.title === keyword) {
                return true;
            }
            if (workout.parts.includes(keyword)) {
                return true;
            }
            if (workout.tool === keyword) {
                return true;
            }
        });
        if (filterData.length === 0) {
            return res.status(300).send({ data: [], message: 'not found' });
        }
        return res.send({ data: filterData, message: 'ok' });
    }
    catch (err) {
        return res.status(500).send({ message: "server error" });
    }
};
exports.default = search;
//# sourceMappingURL=search.js.map