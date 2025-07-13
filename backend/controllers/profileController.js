import userModel from "../models/userModel.js";
import cloudinary from "../configs/cloudinaryConfig.js";
import fs from "fs/promises";

const profile = async (req, res) => {
  try {
      const user = await userModel.findById(req.user.userId).select("-password");
      if (!user) return res.status(404).json({ error: "User Record not found"});
      res.json(user)
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    //UPLOAD IMAGE TO CLOUDINARY
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_photos",
    });

    //UPDATE URL OR PHOTO
    const user = await userModel.findByIdAndUpdate(
      req.user.userId,
      { photo: { url: result.secure_url } },
      { new: true }
    ).select("-password");

    //REMOVE THE LOCAL TEMP FILE
    await fs.unlink(req.file.path);

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { profile, updateProfilePhoto };
 