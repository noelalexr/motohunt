import express from "express";
import { list, create, read, patch, deleteProduct } from "../controllers/productController.js";
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get("/", list);

router.post("/",upload.single('image'), create);

router.get("/:id", read);

// router.put("/:id", update);

router.patch("/:id", patch);

router.delete("/:id", deleteProduct);

export default router;
