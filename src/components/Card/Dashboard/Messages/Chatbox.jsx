import { useState } from "react";
import CountryBtn from "../../../buttons/CountryBtn";

function Chatbox({ message, onBack }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      console.log("Message sent:", inputMessage);
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
          -
        </button>
      </div>
      <div className="chatbox-scroll">
        {/* <img
          src={message.avatar}
          alt={message.name}
          className="chatbox-head-profilehead-pic"
        /> */}
        <p>{message.message}</p>
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
            fontSize: "12px",
            backgroundColor: "#00b100",
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
