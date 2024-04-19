import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema({
  participants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: true,
  },
  group_name: {
    type: String,
  },
  group_picture: {
    type: String,
    enum: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
    ],
  },
  background_color: {
    type: String,
    enum: ["orange", "green", "yellow", "purple", "pink"],
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
  is_group: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Chat", ChatSchema);
