"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/users/index");
const router = express_1.Router();
router.post('/resign', index_1.resign);
router.post('/update', index_1.update);
router.get('/signout', index_1.signout);
router.post('/signin', index_1.signin);
router.post('/signup', index_1.signup);
router.post('/token', index_1.token);
router.post('/kakao', index_1.kakao);
router.post('/google', index_1.google);
router.post('/github', index_1.github);
exports.default = router;
//# sourceMappingURL=users.route.js.map