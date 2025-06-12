import express from "express";
import multer from "multer";
import { profile, updateProfilePhoto } from "../controllers/profileController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", isAuthenticated, profile);
router.put("/photo", isAuthenticated, upload.single("photo"), updateProfilePhoto);

export default router;