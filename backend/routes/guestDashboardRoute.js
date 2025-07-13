import express from "express";
import { guestDashboard } from "../controllers/guestDashboardController.js";


const router = express.Router();

router.get("/", guestDashboard);

export default router;