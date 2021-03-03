"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/main/index");
const router = express_1.Router();
router.get('/', index_1.main);
router.post('/filter', index_1.filter);
router.post('/search', index_1.search);
router.get('/routine', index_1.routine);
exports.default = router;
//# sourceMappingURL=main.route.js.map