"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
/* GET home page. */
router.get("/signup", auth_1.signup_get);
router.post("/signup", auth_1.signup_post);
router.get("/login", auth_1.login_get);
router.post("/login", auth_1.login_post);
router.get("/logout", auth_1.logout_get);
exports.default = router;
//# sourceMappingURL=authRouter.js.map