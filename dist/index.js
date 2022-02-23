"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prisma = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _client = require("@prisma/client");

var _auth = require("./middlewares/auth.js");

var _indexRouter = _interopRequireDefault(require("./routes/indexRouter.js"));

var _authRouter = _interopRequireDefault(require("./routes/authRouter.js"));

var _booksRoutes = _interopRequireDefault(require("./routes/booksRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 5050;
const prisma = new _client.PrismaClient(); // middleware

exports.prisma = prisma;
app.use(_express.default.static("public"));
app.use("/uploads", _express.default.static("uploads"));
app.use(_express.default.json());
app.use((0, _cookieParser.default)()); // view engine

app.set("view engine", "ejs");
app.set("views", _path.default.join(__dirname, "/views")); // setyp db connection

async function main() {
  // routes
  app.get("*", _auth.checkUser);
  app.use(_indexRouter.default);
  app.use(_authRouter.default);
  app.use(_booksRoutes.default);
}

main().catch(e => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});
main();
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});