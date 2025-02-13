import { useEffect, useState } from "react";
import CountryBtn from "../../../buttons/CountryBtn";
import { BorderAllRounded } from "@mui/icons-material";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import socket from "../../../../../config/socketConfig";
import { useSelector } from "react-redux";
import apiClient from "../../../../../config/axiosInstance";

function Chatbox({ message, onBack }) {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const user = useSelector((state) => state.auth);
  const chatId = message.id;


  useEffect(() => {
    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (data) => {
      console.log(data, "received data");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("disconnect");
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const messageData = {
        sender: user.user._id,
        content: inputMessage,
        chatId,
      };
      const response = await apiClient.patch("chat/update", {
        chatId,
        message: messageData,
      });

      socket.emit("sendMessage", { ...response.data.data, chatId });
      setInputMessage("");
    } else {
      console.warn("Empty message cannot be sent");
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-container">
        <div className="chatbox-head">
          <div className="chatbox-head-profilehead">
            <img
              src={message.avatar}
              alt={message.name}
              className="chatbox-head-profilehead-pic"
            />
            <div className="chatbox-head-profilehead-online">
              <h2 className="chatbox-head-title">{message.name}</h2>
              <h6>online</h6>
            </div>
          </div>
          <button className="chatbox-head-back" onClick={onBack}>
            <HomeIcon path="iconback" color="#ffffff" />
          </button>
        </div>
        <div className="chatbox-scroll">
          {message.message.map((msg, index) => (
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
        </div>
      </div>

      <div className="chatbox-type">
        <textarea
          type="text"
          className="chatbox-type-input"
          placeholder="Type message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        ></textarea>
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
