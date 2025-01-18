export default function MessageItem({ message, onClick }) {
  return (
    <div
      key={message.id}
      className="message-item"
      onClick={() => onClick(message)}
    >
      <div className="message-item__content">
        <div className="message-item__header">
          <div className="message-item__avatar">
            <img src={message.avatar} alt={message.name} />
          </div>
          <div className="message-item__name-text-container">
            <h3 className="message-item__name">{message.name}</h3>
            <p className="message-item__text">{message.message}</p>
          </div>
        </div>
      </div>
      {message.unread && <span className="message-item__unread">1</span>}
      <span className="message-item__time">{message.time}</span>
    </div>
  );
}
