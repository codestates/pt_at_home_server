"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const index_1 = require("./routes/index");
require('dotenv').config();
const path = require('path');
const app = express_1.default();
const PORT = 80;
app.use(express_1.default.json());
database_1.default.sequelize.sync().then(() => {
    console.log(" DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    cookie: {
        path: '/',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 60000 * 60,
    }
}));
app.use(cors_1.default({
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'https://savemehomt.com'
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/users', index_1.users);
app.use('/main', index_1.main);
app.use('/myroutine', index_1.myroutine);
app.use('/', express_1.default.static(__dirname + '/build'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=app.js.map