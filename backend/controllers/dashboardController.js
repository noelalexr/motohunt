import productModel from "../models/productModel.js";
import brandModel from "../models/brandModel.js"; //FOR POPULATE
import categoryModel from "../models/categoryModel.js" //FOR POPULATE

const dashboard = async (req, res) => {
    const products = await productModel.find().populate("brand", "name logo").populate("category", "name image");
    res.json(products);
};

export { dashboard };