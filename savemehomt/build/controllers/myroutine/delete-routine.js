"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routines_model_1 = require("../../models/routines.model");
const routine_workouts_model_1 = require("../../models/routine_workouts.model");
const url_1 = require("../url");
const deleteRoutine = async (req, res) => {
    try {
        const { routineId } = req.body;
        await routines_model_1.routines.destroy({ where: { id: routineId } });
        await routine_workouts_model_1.routine_workouts.destroy({ where: { routineId: routineId } });
        res.redirect(`${url_1.url.URL}/myroutine`);
    }
    catch (err) {
        res.status(500).send('server error');
    }
};
exports.default = deleteRoutine;
//# sourceMappingURL=delete-routine.js.map