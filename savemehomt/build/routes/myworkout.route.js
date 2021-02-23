"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/myroutine/index");
const router = express_1.Router();
router.post('/createroutine', index_1.createRoutine);
router.post('/deleteroutine', index_1.deleteRoutine);
router.get('/', index_1.myRoutine);
router.get('/myworkout', index_1.myWorkout);
router.post('/removeworkout', index_1.removeWorkout);
router.post('/saveworkout', index_1.saveWorkout);
exports.default = router;
//# sourceMappingURL=myworkout.route.js.map