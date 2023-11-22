import express from "express";
import {
  signup,
  signin,
  google,
  signout,
  checksession,
  employerSignIn,
  employerSignUp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/google", google);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/checksession", checksession);
router.post("/employersignin", employerSignIn);
router.post("/employersignup", employerSignUp);

export default router;
