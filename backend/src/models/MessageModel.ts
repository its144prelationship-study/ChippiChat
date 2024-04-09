import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message_text: {
        type: String,
        required: true,
        maxlength: [500, "Message cannot be more than 500 characters"],
    },
    send_at: {
        type: Date,
        default: Date.now,
    },
    read_receivers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
});

module.exports = mongoose.model("Message", MessageSchema);