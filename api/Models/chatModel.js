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
                required: true
            },
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            time: {
                type: Date,
                default: Date.now
            }
        }]
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;