import mongoose from "mongoose";;

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: {
            url: {
                type: String,
                default: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873406/others-logo_oaeuqv.png"
            },
        },
    },
    {
        timestamps: true
    }
);

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;