import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

import indexRouter from "./routes/indexRouter";
import authRouter from "./routes/authRouter";

const app = express();
const port = process.env.PORT || 3000;

export const prisma = new PrismaClient();

app.set("view engine", "ejs");
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
  next();
});

async function main() {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
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
