import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js" //FOR POPULATE
import brandModel from "../models/brandModel.js"; //FOR POPULATE

const guestDashboard = async (req, res) => {
    const products = await productModel.find().select("_id name brand image price").populate("brand", "name");
    res.json(products);
};

export { guestDashboard };