const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    background: { type: String, required: true },
    sliderImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema);
