const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    url: [
      {
        shortUrl: { type: String, required: true },
        longUrl: { type: String, required: true },
        customAlias: { type: String, required: true },
        totalClicks: [{ timestamps: { type: Number } }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
