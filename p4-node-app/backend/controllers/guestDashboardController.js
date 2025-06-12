import productModel from "../models/productModel.js";
import brandModel from "../models/brandModel.js";

const guestDashboard = async (req, res) => {
  const products = await productModel.find().select('_id name brand image price').populate('brand', 'name');
  res.json(products);
};

export { guestDashboard };