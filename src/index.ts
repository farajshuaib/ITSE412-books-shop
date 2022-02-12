import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { checkUser } from "./middlewares/auth";

import indexRouter from "./routes/indexRouter";
import authRouter from "./routes/authRouter";

const app = express();
const port = process.env.PORT || 5050;

export const prisma = new PrismaClient();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// setyp db connection
async function main() {
  // routes
  app.get("*", checkUser);
  app.use(indexRouter);
  app.use(authRouter);
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

main();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
