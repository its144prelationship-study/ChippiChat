import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Username cannot be more than 20 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password cannot be less than 6 characters"],
  },
  is_online: {
    type: Boolean,
    default: false,
  },
  pin_chat: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    default: [],
  },
  profile_picture: {
    type: String,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
  },
});

module.exports = mongoose.model("User", UserSchema);