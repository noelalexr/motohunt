import mongoose from "mongoose";;

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        photo: {
            url: {
                type: String,
                default: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749732937/blank-avatar_qbbhb1.jpg"
            },
        },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
