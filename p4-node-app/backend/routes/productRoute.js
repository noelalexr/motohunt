import express from "express";
import { list, create, read, patch, deleteProduct, getUserProducts } from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get("/", list);

router.post("/", upload.single('image'), isAuthenticated, create);

router.get("/:id", isAuthenticated, read);

router.patch("/:id", upload.single('image'), isAuthenticated, patch);

router.delete("/:id", isAuthenticated, deleteProduct);

router.get("/user/:userId", isAuthenticated, getUserProducts);

export default router;
