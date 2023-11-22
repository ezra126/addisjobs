import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  postNewJob,
  updateEmployerInfo,
  getAllPosts,
  getPost,
  editJobPost,
  listJobCategoryByNumber,
} from "../controllers/employer.controller.js";

const router = express.Router();

router.post("/postjob/:id", verifyToken, postNewJob);
router.post("/updateemployer/:id", verifyToken, updateEmployerInfo);
router.put("/updatepost/:id", verifyToken, editJobPost);
router.get("/getallposts/:id", getAllPosts);
router.get("/getpost/:id", getPost);
router.get("/listJobCategoryByNumber", listJobCategoryByNumber);
// router.post("/updatedetailinfo/:id", verifyToken, updateDetailInfo);
// router.get("/test", test);

export default router;
