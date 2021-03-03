"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workouts_model_1 = require("../../models/workouts.model");
const image_model_1 = require("../../models/image.model");
const parts_model_1 = require("../../models/parts.model");
const main = async (req, res) => {
    try {
        const workoutData = await workouts_model_1.workouts.findAll({
            attributes: [
                'id', 'title', 'instruction',
                'setCount', 'count', 'breakTime',
                'calrorie', 'category', 'tool'
            ],
            raw: true,
        });
        const _url = await image_model_1.images.findAll({
            attributes: ['url', 'workoutId'],
            raw: true,
        });
        const _parts = await workouts_model_1.workouts.findAll({
            attributes: ['id'],
            include: { model: parts_model_1.parts },
            raw: true,
        });
        const result = workoutData.map((data, index) => {
            data.image = new Array;
            data.parts = new Array;
            _url.forEach(el => {
                if (el.workoutId === index + 1) {
                    data.image.push(el.url);
                }
            });
            _parts.forEach(part => {
                if (data.id === part.id) {
                    data.parts.push(part['parts.part']);
                }
            });
            return data;
        });
        res.send({ data: result, message: 'ok' });
    }
    catch (err) {
        res.status(500).send({ message: 'server error' });
    }
};
exports.default = main;
//# sourceMappingURL=main.js.map