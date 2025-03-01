// export default function MessageItem({ message, onClick }) {
//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const options = {
//       timeZone: "Asia/Kolkata",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     };
//     return date.toLocaleString("en-IN", options);
//   };

//   return (
//     <div
//       key={message.id}
//       className="message-item"
//       onClick={() => onClick(message)}
//     >
//       <div className="message-item__content">
//         <div className="message-item__header">
//           <div className="message-item__avatar">
//             <img src={message.avatar} alt={message.name} />
//           </div>
//           <div className="message-item__name-text-container">
//             <h3 className="message-item__name">{message.name}</h3>
//             <p className="message-item__text">
//               {message.message[message.message.length - 1]?.content ||
//                 message.message}
//             </p>
//           </div>
//         </div>
//       </div>
//       {message.unread && <span className="message-item__unread">1</span>}
//       <span className="message-item__time">
//         {formatTime(message.message[message.message.length - 1]?.time)}
//       </span>
//     </div>
//   );
// }

import React from 'react';

export default function MessageItem({ message, onClick }) {
  // Format time to display in a friendly format
  const formatTime = (timestamp) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    // Show time for today's messages, date for older ones
    if (isToday) {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return date.toLocaleString("en-IN", options);
    } else {
      const options = {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
      };
      return date.toLocaleString("en-IN", options);
    }
  };

  // Get the last message content to display
  const getLastMessage = () => {
    // if (!message.message || message.message.length === 0) {
    //   return "Start a conversation";
    // }
    return message.message[message.message.length - 1]?.content || "No messages yet";
  };

  // Get time from the latest message or fallback to chat creation time
  const getMessageTime = () => {
    if (message.message && message.message.length > 0) {
      return formatTime(message.message[message.message.length - 1]?.time);
    }
    return formatTime(message.time);
  };

  // Calculate unread message count
  const getUnreadCount = () => {
    if (!message.message || !Array.isArray(message.message)) return 0;

    // Assuming you have the current user ID available in your component
    const currentUserId = JSON.parse(localStorage.getItem('user'))?._id || '';

    // Count messages that are not from the current user and haven't been read
    return message.message.filter(msg =>
      msg.sender !== currentUserId && !msg.isRead
    ).length;
  };

  const unreadCount = getUnreadCount();

  return (
    <div
      key={message.id}
      className={`message-item ${unreadCount > 0 ? 'has-unread' : ''}`}
      onClick={() => onClick(message)}
    >
      <div className="message-item__header">
        <div className="message-item__avatar">
          <img src={message.avatar || '/default-avatar.png'} alt={message.name} />
        </div>
        <div className="message-item__name-text-container">
          <h3 className="message-item__name">{message.name}</h3>
          <p className="message-item__text">
            {getLastMessage()}
          </p>
        </div>
      </div>

      <span className="message-item__time">{getMessageTime()}</span>

      {unreadCount > 0 && (
        <span className="message-item__unread">{unreadCount}</span>
      )}
    </div>
  );
}