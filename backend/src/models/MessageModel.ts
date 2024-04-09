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
        maxlenght: [500, "Message cannot be more than 500 characters"],
    },
    send_at: {
        type: Date,
        default: Date.now,
    },
    is_read: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Message", MessageSchema);