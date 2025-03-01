import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
    {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        },
        messages: [{
            content: {
                type: String,
            },
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            time: {
                type: Date,
                default: Date.now
            },
            isRead: {
                type: Boolean,
                default: false,
              },
              chatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat",
              },
        }]
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;