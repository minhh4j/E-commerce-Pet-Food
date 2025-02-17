const mongoose = require("mongoose");


const whishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

const Whishlist = mongoose.model("Whishlist", whishlistSchema);
module.exports = Whishlist;
