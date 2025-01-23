import { useState } from "react";
import CountryBtn from "../../../buttons/CountryBtn";
import { BorderAllRounded } from "@mui/icons-material";
import HomeIcon from "../../../utils/Icons/HomeIcon";

function Chatbox({ message, onBack }) {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: inputMessage },
      ]);
      setInputMessage("");
    } else {
      console.warn("Empty message cannot be sent");
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-head">
        <div className="chatbox-head-profilehead">
          <img
            src={message.avatar}
            alt={message.name}
            className="chatbox-head-profilehead-pic"
          />
          <div className="chatbox-head-profilehead-online">
            <h2 className="chatbox-head-title">Arun</h2>
            <h6>online</h6>
          </div>
        </div>
        <button className="chatbox-head-back" onClick={onBack}>
          <HomeIcon path="iconback" color="#ffffff" />
        </button>
      </div>
      <div className="chatbox-scroll">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chatbox-message ${
              msg.sender === "You"
                ? "chatbox-message-sent"
                : "chatbox-message-received"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
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
