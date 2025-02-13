import { useState } from "react";
import ArrowBlue from "../../../buttons/ArrowBlue";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import MessageItem from "./MessageItem";
import Chatbox from "./Chatbox";
import { useSelector } from "react-redux";
import UsersList from "./UsersList";
import apiClient from "../../../../../config/axiosInstance";

// ... existing code ...
export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showUsersList, setShowUsersList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.auth);
console.log(currentUser , "current user")

  const messages = [
    {
      id: 1,
      name: "Arun",
      message: ["Hi Aswathi, I'd like to invite you to...", "fefe"],
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 11,
      name: "Arun",
      message: ["Hi Aswathi, I'd like to invite you to...", "fefe"],
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 1,
      name: "Arun",
      message: ["Hi Aswathi, I'd like to invite you to...", "fefe"],
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 11,
      name: "Arun",
      message: ["Hi Aswathi, I'd like to invite you to...", "fefe"],
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 1,
      name: "Arun",
      message: ["Hi Aswathi, I'd like to invite you to...", "fefe"],
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 11,
      name: "Arun",
      message: ["Hi Aswathi, I'd like to invite you to...", "fefe"],
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
  ];

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleSelectUser = async (user) => {
    const chat = await apiClient.post("chat/create", {
      users: [currentUser.user._id, user._id],
    });
    console.log(chat, "chat");

    const message = {
      id: chat.data.data._id,
      name: chat.data.data.users.find((u) => u._id !== currentUser.user._id).name,
      message: "",
      time: chat.data.data.createdAt,
      avatar: chat.data.data.users.find((u) => u._id !== currentUser.user._id)
        .image,
      unread: true,
    };
    console.log(message.name , "message")
    setSelectedMessage(message);
  };

  return (
    <div className="messages">
      {selectedMessage ? (
        <Chatbox
          message={selectedMessage}
          onBack={() => setSelectedMessage(null)}
        />
      ) : showUsersList ? (
        <UsersList
          onSelectUser={handleSelectUser}
          onBack={() => setShowUsersList(false)}
        />
      ) : (
        <>
          <div className="messages__header">
            <h2 className="title">Messages</h2>
            <ArrowBlue onClick={() => setShowUsersList(true)}>
              <HomeIcon path="plus" color="#ffffff" />
            </ArrowBlue>
          </div>
          {/* ... rest of the existing messages list code ... */}
          <div className="messages__search">
            <input
              type="text"
              placeholder="Search"
              className="messages__search-input"
            />
          </div>
          <div className="messages-scroll">
            <div className="messages__list">
              {messages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  onClick={handleSelectMessage} // Pass the click handler
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
