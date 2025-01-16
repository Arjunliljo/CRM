import HomeIcon from "../../utils/Icons/HomeIcon";

export default function Messages() {
  const messages = [
    {
      id: 1,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true
    },
    {
      id: 2,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
    {
      id: 3,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
    {
      id: 4,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },

  ];

  return (
    <div className="messages">
      <div className="messages__header">
        <h2 className="messages__title">Messages</h2>
        <button className="messages__add-btn">
          <HomeIcon
            path="plus"
            color="#fffffff8"
            style={{ transform: "rotate(270deg)" }}
          />
        </button>
      </div>

      <div className="messages__search">
        <input
          type="text"
          placeholder="Search"
          className="messages__search-input"
        />
      </div>

      <div className="messages__list">
        {messages.map((message) => (
          <div key={message.id} className="message-item">

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
        ))
        }
      </div >
    </div >
  );
}