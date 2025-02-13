import Chat from "../Models/chatModel.js";
import catchAsync from "../Utilities/catchAsync.js";

export const createChat = catchAsync(async (req, res) => {

  if (!req.body.users || req.body.users.length !== 2) {
      return res.status(400).json({
          status: "fail",
          message: "Please provide exactly two users for the chat"
      });
  }

  const existingChat = await Chat.findOne({
      users: { $all: req.body.users }
  }).populate({
      path: 'users',
      select: '_id name image'
  });

  if (existingChat) {
      return res.status(200).json({
          status: "success",
          data: existingChat
      });
  }

  const newChat = await Chat.create({
      users: req.body.users,
      messages: []
  });

  const populatedChat = await Chat.findById(newChat._id).populate({
      path: 'users',
      select: '_id name image'
  });

  res.status(201).json({
      status: "success",
      data: populatedChat
  });

});

export const updateChat = catchAsync(async (req, res, next) => {
    const { chatId, message } = req.body;
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {
                messages: {
                    content: message.content,
                    sender: message.sender,
                    time: new Date()
                }
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).populate({
        path: 'users',
        select: '_id name image'
    });

    if (!chat) {
        return res.status(404).json({
            status: "fail",
            message: "Chat not found"
        });
    }

    res.status(200).json({
        status: "success",
        data: chat
    });
});

export const getChats = catchAsync(async (req, res, next) => {
    const chats = await Chat.find();
    res.status(200).json({
        status: "success",
        data: chats
    });
});