import express from "express";
import { categories } from "../controllers/categoryController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, categories);

export default router;