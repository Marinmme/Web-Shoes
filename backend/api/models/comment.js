const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    productDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
      required: true,
    },
    star: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
