import mongoose from "mongoose";;

const brandSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true,},
    },
    {
        timestamps: true
    }
);

const brandModel = mongoose.model("Brand", brandSchema);

export default brandModel;