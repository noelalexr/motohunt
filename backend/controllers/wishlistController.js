import userModel from "../models/userModel.js";

const addToWishlist = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.body.productId;

  const user = await userModel.findById(userId);
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.json({ message: "Added to wishlist" });
};

const wishlist = async (req, res) => {
  const userId = req.user.userId;
  const user = await userModel.findById(userId).populate("wishlist");

  res.json(user.wishlist);
};

const removeFromWishlist = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.body.productId;

  await userModel.findByIdAndUpdate(userId, {
    $pull: { wishlist: productId }
  });

  res.json({ message: "Removed from wishlist" });
};

export { addToWishlist, wishlist, removeFromWishlist };