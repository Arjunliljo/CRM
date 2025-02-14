import { useState } from "react";
import ArrowBlue from "../../../buttons/ArrowBlue";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import MessageItem from "./MessageItem";
import Chatbox from "./Chatbox";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import apiClient from "../../../../../config/axiosInstance";
import { setSelectedMessage } from "../../../../../global/chatSlice";

// ... existing code ...
export default function Messages() {
  const [showUsersList, setShowUsersList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.chat.chats);
  const selectedMessage = useSelector((state) => state.chat.selectedMessage);
  const dispatch = useDispatch();

  const handleSelectMessage = (message) => {
    dispatch(setSelectedMessage(message));
  };

  const handleSelectUser = async (user) => {
    const chat = await apiClient.post("chat/create", {
      users: [currentUser.user._id, user._id],
    });

    const message = {
      id: chat.data.data._id,
      name: chat.data.data.users.find((u) => u._id !== currentUser.user._id)
        .name,
      message: "",
      time: chat.data.data.createdAt,
      avatar: chat.data.data.users.find((u) => u._id !== currentUser.user._id)
        .image,
      unread: true,
    };
    dispatch(setSelectedMessage(message));
  };

  return (
    <div className="messages">
      {selectedMessage ? (
        <Chatbox
          message={selectedMessage}
          onBack={() => dispatch(setSelectedMessage(null))}
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
          <div className="messages__search">
            <input
              type="text"
              placeholder="Search"
              className="messages__search-input"
            />
          </div>
          <div className="messages-scroll">
            <div className="messages__list">
              {chats.map((chat) => {
                const otherUser = chat.users.find(
                  (u) => u._id !== currentUser.user._id
                );
                const message = {
                  id: chat._id,
                  name: otherUser.name,
                  message: chat.messages,
                  time: chat.updatedAt,
                  avatar: otherUser.image,
                  unread: chat.unread || false,
                };
                return (
                  <MessageItem
                    key={chat._id}
                    message={message}
                    onClick={handleSelectMessage}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
