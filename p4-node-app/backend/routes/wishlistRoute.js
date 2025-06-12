import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { addToWishlist, wishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToWishlist);
router.post("/remove", isAuthenticated, removeFromWishlist);
router.get("/", isAuthenticated, wishlist);

export default router;