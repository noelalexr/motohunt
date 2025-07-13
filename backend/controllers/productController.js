import productModel from "../models/productModel.js";
import brandModel from "../models/brandModel.js"; //FOR POPULATE
import categoryModel from "../models/categoryModel.js"; //FOR POPULATE
import userModel from "../models/userModel.js" //FOR POPULATE
import cloudinary from "../configs/cloudinaryConfig.js"
import multer from "multer";

const upload = multer({ dest: "uploads/" }).single("image");

//LIST ALL PRODUCTS or LIST BASED ON SEACHED VALUES
const list = async (req, res) => {
    const search = req.query.search?.toLowerCase();
    try {
        let pipeline = [
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: "$brand" },

            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },
        ];

        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { "brand.name": { $regex: search, $options: "i" } },
                        { "category.name": { $regex: search, $options: "i" } },
                        { price: !isNaN(search) ? Number(search) : -999999 },
                        { engineDisplacement: !isNaN(search) ? Number(search) : -999999 }
                    ]
                }
            });
        }

        const products = await productModel.aggregate(pipeline);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//ADD PRODUCT
const create = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products"
        });
        const newProduct = new productModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            engineDisplacement: req.body.engineDisplacement,
            user: req.body.user,
            image: { url: result.secure_url }
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//VIEW 1 PRODDUCT BY ID
const read = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
            .populate("brand", "name")
            .populate("category", "name")
            .populate("user", "name photo");
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const patch = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.engineDisplacement = req.body.engineDisplacement;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });
            product.image = { url: result.secure_url };
        }

        await product.save();

        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const deleted = await productModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getUserProducts = async (req, res) => {
    try {
        const userId = req.params.userId;

        const products = await productModel.find({ user: userId })
            .populate("brand name")
            .populate("category name");

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { list, create, read, patch, deleteProduct, getUserProducts };