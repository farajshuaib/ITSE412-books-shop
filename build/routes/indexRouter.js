"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET login page. */
router.get('/login', function (req, res, next) {
    res.send("hello world");
});
exports.default = router;
//# sourceMappingURL=indexRouter.js.map