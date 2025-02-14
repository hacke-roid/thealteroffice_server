const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    
  },
  { timestamps: true }
);

userSchema.path("email").index({ unique: true });

module.exports = model("user", userSchema);
