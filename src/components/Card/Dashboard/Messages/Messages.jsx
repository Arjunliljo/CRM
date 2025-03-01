import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessage, markMessagesAsRead } from "../../../../../global/chatSlice";
import { refetchChats } from "../../../../apiHooks/useChats";
import apiClient from "../../../../../config/axiosInstance";
import socket from "../../../../../config/socketConfig";
import Chatbox from "./Chatbox";
import UsersList from "./UsersList";
import ArrowBlue from "../../../buttons/ArrowBlue";
import MessageItem from "./MessageItem";
import { IoAdd } from "react-icons/io5";
import { MdOutlineSearchOff } from "react-icons/md";

export default function Messages() {
  const [showUsersList, setShowUsersList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.chat.chats);
  const selectedMessage = useSelector((state) => state.chat.selectedMessage);
  const dispatch = useDispatch();

  const filteredChats = chats.filter((chat) => {
    const otherUser = chat.users.find((u) => u._id !== currentUser.user._id);
    return otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelectMessage = (message) => {
    // Mark messages as read via API
    markMessagesAsReadAPI(message.id);

    // Emit socket event for real-time update
    socket.emit("markMessagesAsRead", {
      chatId: message.id,
      userId: currentUser.user._id
    });

    // Update Redux state
    dispatch(markMessagesAsRead(message.id));
    dispatch(setSelectedMessage(message));
  };

  // Function to call API to mark messages as read
  const markMessagesAsReadAPI = async (chatId) => {
    try {
      await apiClient.patch(`chat/markAsRead`, {
        chatId,
        userId: currentUser.user._id
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleSelectUser = async (user) => {
    try {
      const chat = await apiClient.post("chat/create", {
        users: [currentUser.user._id, user._id],
      });

      const otherUser = chat.data.data.users.find(
        (u) => u._id !== currentUser.user._id
      );

      const message = {
        id: chat.data.data._id,
        name: otherUser.name,
        message: chat.data.data.messages || [],
        time: chat.data.data.createdAt,
        avatar: otherUser.image,
      };

      dispatch(setSelectedMessage(message));
      refetchChats();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Sort chats by latest message time
  const sortedChats = [...filteredChats].sort((a, b) => {
    const aTime = a.messages.length > 0
      ? new Date(a.messages[a.messages.length - 1].time)
      : new Date(a.updatedAt);
    const bTime = b.messages.length > 0
      ? new Date(b.messages[b.messages.length - 1].time)
      : new Date(b.updatedAt);
    return bTime - aTime; // Most recent first
  });

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
              <IoAdd color="#ffffff" />
            </ArrowBlue>
          </div>
          <div className="messages__search">
            <input
              type="text"
              placeholder="Search"
              className="messages__search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="messages-scroll">
            <div className="messages__list">
              {sortedChats.map((chat) => {
                const otherUser = chat.users.find(
                  (u) => u._id !== currentUser.user._id
                );

                // Check for unread messages
                const unreadMessages = chat.messages.filter(
                  msg => msg.sender !== currentUser.user._id && !msg.isRead
                );

                const message = {
                  id: chat._id,
                  name: otherUser?.name,
                  message: chat?.messages || [],
                  time: chat?.updatedAt,
                  avatar: otherUser?.image,
                  unread: unreadMessages.length > 0
                };

                return (
                  <MessageItem
                    key={chat._id}
                    message={message}
                    onClick={handleSelectMessage}
                  />
                );
              })}
              {filteredChats.length === 0 && searchQuery && (
                <div className="no-users-message">
                  <MdOutlineSearchOff fontSize="3rem" />
                  <p>No users found</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}