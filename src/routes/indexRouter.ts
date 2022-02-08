import express from "express";
const router = express.Router();

/* GET login page. */
router.get('/login', function(req:any, res:any, next:any) {
  res.send("hello world");
});


export default router

