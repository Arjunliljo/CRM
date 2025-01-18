function Chatbox({ message, onBack }) {
  return (
    <div className="chatbox" onClick={onBack}>
      <div className="chatbox-head">
        <h2 className="chatbox-head-title">Arun</h2>
        <button className="chatbox-head-back" onClick={onBack}>
          -
        </button>
      </div>
      <div className="chatbox-scroll">{message.message}</div>
    </div>
  );
}

export default Chatbox;
