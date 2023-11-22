import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  updateUserBasicInfo,
  test,
  updateDetailInfo,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/updatebasicinfo/:id", verifyToken, updateUserBasicInfo);
router.post("/updatedetailinfo/:id", verifyToken, updateDetailInfo);
router.get("/test", test);

export default router;
