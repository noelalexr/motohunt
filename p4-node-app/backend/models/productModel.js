import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true, },
        description: { type: String, required: true, },
        price: { type: Number, required: true, },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
        engineDisplacement: { type: Number, required: true, },
        image: { url: { type: String, required: true }, },
    },
    {
        timestamps: true
    }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;