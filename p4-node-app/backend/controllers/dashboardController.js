import productModel from "../models/productModel.js";
import brandModel from "../models/brandModel.js";

const dashboard = async (req, res) => {
  const products = await productModel.find().populate('brand', 'name').populate('category', 'name');
  res.json(products);
};

export { dashboard };