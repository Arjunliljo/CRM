import React from "react";
import ArrowBlue from "../../../buttons/ArrowBlue";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSearchOff } from "react-icons/md";

export default function UsersList({ onSelectUser, onBack }) {
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredUsers = users.users.filter((user) => {
    return (
      user._id !== currentUser.user._id &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="users-list">
      <div className="messages__header">
        <h2 className="title">Users</h2>
        <ArrowBlue onClick={onBack}>
          <IoIosArrowBack color="#ffffff" />
        </ArrowBlue>
      </div>

      <div className="messages__search">
        <input
          type="text"
          placeholder="Search users"
          className="messages__search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="messages-scroll">
        <div className="messages__list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="message-item"
                onClick={() => onSelectUser(user)}
              >
                <img
                  src={user.image || "default-avatar-url"}
                  alt={user.name}
                  className="message-item__avatar"
                />
                <div className="message-item__content">
                  <h3 className="message-item__name">{user.name}</h3>
                  <p className="message-item__status">
                    {user.status || "Available"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-users-message">
              <MdOutlineSearchOff fontSize="3rem" />
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
