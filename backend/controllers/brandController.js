import brandModel from "../models/brandModel.js";

const brands = async (req, res) => {
    try {
        const brands = await brandModel.find({});
        res.json(brands);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { brands };