"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resign = exports.update = exports.token = exports.signup = exports.signout = exports.signin = exports.kakao = exports.google = exports.github = void 0;
var oauth_github_1 = require("./oauth.github");
Object.defineProperty(exports, "github", { enumerable: true, get: function () { return __importDefault(oauth_github_1).default; } });
var oauth_google_1 = require("./oauth.google");
Object.defineProperty(exports, "google", { enumerable: true, get: function () { return __importDefault(oauth_google_1).default; } });
var oauth_kakao_1 = require("./oauth.kakao");
Object.defineProperty(exports, "kakao", { enumerable: true, get: function () { return __importDefault(oauth_kakao_1).default; } });
var signin_1 = require("./signin");
Object.defineProperty(exports, "signin", { enumerable: true, get: function () { return __importDefault(signin_1).default; } });
var signout_1 = require("./signout");
Object.defineProperty(exports, "signout", { enumerable: true, get: function () { return __importDefault(signout_1).default; } });
var signup_1 = require("./signup");
Object.defineProperty(exports, "signup", { enumerable: true, get: function () { return __importDefault(signup_1).default; } });
var token_1 = require("./token");
Object.defineProperty(exports, "token", { enumerable: true, get: function () { return __importDefault(token_1).default; } });
var update_1 = require("./update");
Object.defineProperty(exports, "update", { enumerable: true, get: function () { return __importDefault(update_1).default; } });
var resign_1 = require("./resign");
Object.defineProperty(exports, "resign", { enumerable: true, get: function () { return __importDefault(resign_1).default; } });
//# sourceMappingURL=index.js.map