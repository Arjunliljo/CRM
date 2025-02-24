import { useEffect, useState, useRef } from "react";
import { IconContext } from "react-icons";
import { FaCircle } from "react-icons/fa";
import CountryBtn from "../../../buttons/CountryBtn";
import { BorderAllRounded } from "@mui/icons-material";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import socket from "../../../../../config/socketConfig";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../../../config/axiosInstance";
import EmojiPicker from "emoji-picker-react";
import {
  updateSelectedMessage,
  updateChats,
} from "../../../../../global/chatSlice";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSend } from "react-icons/bi";

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
  const emojiPickerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setInputMessage((prevInput) => prevInput + emojiObject.emoji);
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
              src={message?.avatar || ""}
              alt={message?.name || ""}
              className="chatbox-head-profilehead-pic"
            />
            <div className="chatbox-head-profilehead-online">
              <h2 className="chatbox-head-title">{message && message.name}</h2>
              <h6>
                {isTyping ? (
                  "typing..."
                ) : (
                  <>
                    <span
                      style={{
                        color: "green",
                        marginRight: "0px",
                        fontSize: "7px",
                      }}
                    >
                      <IconContext.Provider
                        value={{ color: "green", size: "1em" }}
                      >
                        <FaCircle />
                      </IconContext.Provider>
                    </span>{" "}
                    online
                  </>
                )}
              </h6>
            </div>
          </div>
          <button className="chatbox-head-back" onClick={onBack}>
            <HomeIcon path="iconback" color="#ffffff" />
          </button>
        </div>
        <div className="chatbox-scroll">
          {selectedMessage &&
            selectedMessage.message.map((msg, index) => (
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

      <div
        className="chatbox-type"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          className="chatbox-input-container"
          style={{ position: "relative", flex: 1 }}
        >
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              style={{
                position: "absolute",
                bottom: "100%",
                left: "0",
                zIndex: 1,
                transform: "scale(0.8)",
                transformOrigin: "bottom left",
              }}
            >
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                searchDisabled
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
          <div style={{ position: "relative" }}>
            <textarea
              type="text"
              className="chatbox-type-input"
              placeholder="Type message..."
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              style={{ width: "100%", paddingRight: "80px" }}
            />
            <div
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "20px",
                  width: "1px",
                  backgroundColor: "#e0e0e0",
                  marginRight: "4px",
                }}
              />
              <button
                className="emoji-button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  padding: "0",
                }}
              >
                <BsEmojiSmile color="#0075fc" fontSize="1rem" />
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
                onClick={handleSendMessage}
              >
                <BiSend color="#0075fc" fontSize="1.3rem" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
