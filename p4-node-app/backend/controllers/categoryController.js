import categoryModel from "../models/categoryModel.js";

const categories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { categories };