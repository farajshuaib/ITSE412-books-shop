import express from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser'
require('dotenv').config()


import indexRouter from "./routes/indexRouter"
import authRouter from "./routes/authRouter"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization')
  next()
})


app.use('/', indexRouter);
app.use('/auth', authRouter);



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
