import ArrowBlue from "../../../buttons/ArrowBlue";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import MessageItem from "./MessageItem";

export default function Messages() {
  const messages = [
    {
      id: 1,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 11,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 12,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      unread: true,
    },
    {
      id: 2,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
    {
      id: 3,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
    {
      id: 4,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
    {
      id: 42,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
    {
      id: 43,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },
  ];

  return (
    <div className="messages">
      <div className="messages__header">
        <h2 className="title">Messages</h2>
        <ArrowBlue>
          <HomeIcon path="plus" color="#fffffff8" />
        </ArrowBlue>
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
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
