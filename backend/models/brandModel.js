import mongoose from "mongoose";;

const brandSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        logo: {
            url: {
                type: String,
                default: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823736/others-logo_uytki2.png"
            },
        },
    },
    {
        timestamps: true
    }
);

const brandModel = mongoose.model("Brand", brandSchema);

export default brandModel;