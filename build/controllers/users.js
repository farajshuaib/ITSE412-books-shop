"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_loged_in = exports.UpdateUserData = exports.allUser = exports.deleteUser = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_1 = require("express-validator/check");
const users_1 = require("../models/users");
const index_1 = require("../index");
const SECRET = "asbadbbdbbh7788888887hb113h3hbb";
var JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = SECRET;
opts.audience = "localhost";
const allUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield index_1.prisma.users.findMany();
});
exports.allUser = allUser;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const user_exists = yield index_1.prisma.users.findFirst({
        select: { email: req.body.email },
    });
    if (user_exists) {
        res
            .status(302)
            .json({ status: "faild", message: "user already exist try to signin" });
        return;
    }
    req.body.password = yield bcrypt_1.default.hash(req.body.password, 12);
    const user = new users_1.User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    const createdUser = yield index_1.prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const user = yield index_1.prisma.users.findUnique({
        where: { email: req.body.email },
    });
    if (!user) {
        res.status(400).json({ status: "faild", message: "user doesn't exist" });
        return;
    }
    if (user.password) {
        const valid = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!valid) {
            res.status(400).json({
                status: "faild",
                message: "Incorrect password !",
                token: null,
            });
            return;
        }
    }
    const payload = {
        user: {
            id: user.id,
        },
    };
    jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: "365d" }, (err, token) => {
        res.status(200).json({ status: "success", data: user, token });
    });
});
exports.signin = signin;
const is_loged_in = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.is_loged_in = is_loged_in;
const UpdateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    if (!req.params.id) {
        return;
    }
    const user = yield index_1.prisma.users.update({
        where: { id: +req.params.id },
        data: userData,
    });
});
exports.UpdateUserData = UpdateUserData;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.prisma.users.findUnique({
        where: { id: +req.params.id },
    });
    if (!user) {
        return;
    }
    yield index_1.prisma.users.delete({ where: { id: +req.params.id } });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map