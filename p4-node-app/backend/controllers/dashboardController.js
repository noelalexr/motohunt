import productModel from "../models/productModel.js";
import brandModel from "../models/brandModel.js";

const dashboard = async (req, res) => {
    const products = await productModel.find().populate('brand', 'name logo').populate('category', 'name image');
    res.json(products);
};

export { dashboard };