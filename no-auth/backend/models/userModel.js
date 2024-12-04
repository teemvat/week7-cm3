const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    uUsername: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    membership_status: { type: String, required: true },
    address: { type: String, required: true },
    profile_picture: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("User", userSchema);
