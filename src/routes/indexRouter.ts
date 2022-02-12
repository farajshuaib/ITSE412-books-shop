import express from "express";
import { requireAuth } from "../middlewares/auth";
import { getAllSpecifications } from "../controllers/specialization";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  const specifications = await getAllSpecifications(req, res);
  res.render("home", { specifications });
});

export default router;
