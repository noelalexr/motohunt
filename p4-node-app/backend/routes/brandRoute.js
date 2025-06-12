import express from "express";
import { brands } from "../controllers/brandController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, brands);

export default router;