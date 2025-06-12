import express from "express";
import { dashboard } from "../controllers/dashboardController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, dashboard);

export default router;