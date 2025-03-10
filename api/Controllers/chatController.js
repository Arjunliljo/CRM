import Chat from "../Models/chatModel.js";
import catchAsync from "../Utilities/catchAsync.js";

export const createChat = catchAsync(async (req, res) => {
  if (!req.body.users?.length === 2) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide exactly two users for the chat",
    });
  }

  const existingChat = await Chat.findOne({
    users: { $all: req.body.users },
  }).populate("users", "_id name image");

  if (existingChat) {
    return res.status(200).json({
      status: "success",
      data: existingChat,
    });
  }

  const newChat = await Chat.create({
    users: req.body.users,
    messages: [],
  }).then((chat) => chat.populate("users", "_id name image"));

  res.status(201).json({
    status: "success",
    data: newChat,
  });
});

export const updateChat = catchAsync(async (req, res, next) => {
  const { chatId, message } = req.body;

  const newMessage = {
    content: message.content,
    sender: message.sender,
    time: new Date(),
    chatId: chatId,
  };


  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {
        messages: newMessage,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "users",
    select: "_id name image",
  });

  if (!chat) {
    return res.status(404).json({
      status: "fail",
      message: "Chat not found",
    });
  }

  // Get access to io from req.app
  const io = req.app.get('io');

  // Emit the message to all users in the chat
  if (io) {
    io.to(chatId).emit('newMessage', {
      chatId,
      message: newMessage
    });
  }


  res.status(200).json({
    status: "success",
    data: newMessage,
  });
});

// export const getChats = catchAsync(async (req, res, next) => {
//     const { userId } = req.query;
//     console.log("userId", userId);
//     if (!userId) {
//         return res.status(400).json({
//             status: "fail",
//             message: "User ID is required"
//         });
//     }

//     const chats = await Chat.find({ users: { $in: userId } }).populate('users', '_id name image');

//     res.status(200).json({
//         status: "success",
//         data: chats
//       });
// });
export const getChats = catchAsync(async (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      status: "fail",
      message: "User ID is required",
    });
  }

  const chats = await Chat.find({
    users: userId, // Removed $in operator since we're looking for an exact match
  })
    .populate("users", "_id name image")
    .populate("messages")
    .sort({ updatedAt: -1 }); // Sort by updatedAt in descending order to get latest chats first

  res.status(200).json({
    status: "success",
    data: chats,
  });
});

export const markMessagesAsRead = catchAsync(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({
      status: "fail",
      message: "Chat ID and User ID are required",
    });
  }

  // Update all messages in the chat where the sender is not the current user
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $set: {
        "messages.$[elem].isRead": true,
      },
    },
    {
      arrayFilters: [{ "elem.sender": { $ne: userId } }],
      new: true,
      runValidators: true,
    }
  );

  if (!chat) {
    return res.status(404).json({
      status: "fail",
      message: "Chat not found",
    });
  }

  // Emit socket event that messages have been read
  req.io.to(chatId).emit("messagesRead", {
    chatId,
    readByUserId: userId
  });


  res.status(200).json({
    status: "success",
    message: "Messages marked as read",
  });
});