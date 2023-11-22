import express from "express";
//import { verifyToken } from "../utils/verifyToken.js";
import {
  getJob,
  getLatestJobs,
  getPostandEmployerInfo,
  getbyJobCategory,
  searchPost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getlatestjobs/", getLatestJobs);
router.get("/getjob/:id", getJob);
router.get("/getpostandemployerinfo/", getPostandEmployerInfo);
router.get("/getpostbyjobcategory/:category", getbyJobCategory);
router.get("/searchJob/", searchPost);

export default router;
