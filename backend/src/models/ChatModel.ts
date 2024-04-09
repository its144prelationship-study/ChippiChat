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
        enum: ["11", "12", "13", "14"],
    },
    background_color: {
        type: String,
        enum: ["ORANGE", "GREEN", "YELLOW", "PURPLE", "PINK"],
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

const Chat = mongoose.model("Chat", ChatSchema);