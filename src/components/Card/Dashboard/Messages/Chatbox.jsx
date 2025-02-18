import { useEffect, useState, useRef } from "react";
import CountryBtn from "../../../buttons/CountryBtn";
import { BorderAllRounded } from "@mui/icons-material";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import socket from "../../../../../config/socketConfig";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../../../config/axiosInstance";
import EmojiPicker from 'emoji-picker-react';
import { updateSelectedMessage, updateChats } from "../../../../../global/chatSlice";

function Chatbox({ message, onBack }) {
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const user = useSelector((state) => state.auth);
  const selectedMessage = useSelector((state) => state.chat.selectedMessage);
  const chatId = selectedMessage.id;
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedMessage]);

  useEffect(() => {
    if (chatId) {
      socket.emit("joinChat", chatId);

      socket.on("typing", ({ chatId: typingChatId }) => {
        if (typingChatId === chatId) {
          setIsTyping(true);
        }
      });

      socket.on("stopTyping", ({ chatId: typingChatId }) => {
        if (typingChatId === chatId) {
          setIsTyping(false);
        }
      });
    }

    return () => {
      if (chatId) {
        socket.emit("leaveChat", chatId);
        socket.off("typing");
        socket.off("stopTyping");
      }
    };
  }, [chatId]);

  const handleTyping = () => {
    socket.emit("typing", { chatId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { chatId });
    }, 2000);
  };

  const onEmojiClick = (emojiObject) => {
    setInputMessage(prevInput => prevInput + emojiObject.emoji);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const messageData = {
        sender: user.user._id,
        content: inputMessage,
        chatId,
      };

      try {
        const response = await apiClient.patch("chat/update", {
          chatId,
          message: messageData,
        });
        dispatch(updateSelectedMessage(response.data.data));
        dispatch(updateChats({ chatId, message: response.data.data }));
        socket.emit("sendMessage", response.data.data);
        setInputMessage("");
        socket.emit("stopTyping", { chatId });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-container">
        <div className="chatbox-head">
          <div className="chatbox-head-profilehead">
            <img
              src={message?.avatar || ''}
              alt={message?.name || ''}
              className="chatbox-head-profilehead-pic"
            />
            <div className="chatbox-head-profilehead-online">
              <h2 className="chatbox-head-title">{message && message.name}</h2>
              <h6>{isTyping ? "typing..." : "online"}</h6>
            </div>
          </div>
          <button className="chatbox-head-back" onClick={onBack}>
            <HomeIcon path="iconback" color="#ffffff" />
          </button>
        </div>
        <div className="chatbox-scroll">
          {selectedMessage && selectedMessage.message.map((msg, index) => (
            <div
              key={index}
              className={`chatbox-message ${
                msg.sender === user.user._id
                  ? "chatbox-message-sent"
                  : "chatbox-message-received"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chatbox-type">
        <button
          className="emoji-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            padding: '5px'
          }}
        >
          😊
        </button>
        <div className="chatbox-input-container" style={{ position: 'relative' }}>
          {showEmojiPicker && (
            <div style={{ position: 'absolute', bottom: '100%', left: '0', zIndex: 1 }}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <textarea
            type="text"
            className="chatbox-type-input"
            placeholder="Type message..."
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              handleTyping();
            }}
            style={{ width: 'calc(100% - 50px)' }}
          />
        </div>
        <CountryBtn
          style={{
            paddingLeft: "6.5px",
            paddingRight: "6.5px",
            fontSize: "14px",
            borderRadius: "15px",
            backgroundColor: "#0075fc",
          }}
          onClick={handleSendMessage}
        >
          Send
        </CountryBtn>
      </div>
    </div>
  );
}

export default Chatbox;