import React from "react";
import HomeIcon from "../../../utils/Icons/HomeIcon";

export default function WorkItemTop({ item }) {
  return (
    <div className="work-item-content-top">
      <div className="work-item-content-top-left">
        <div className="message-item__avatar">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
            alt=" user"
          />
        </div>
        <div className="work-item-content-name-container">
          <h2>{item.name}</h2>
          <span className="work-item-content-sm-bold">{item.id}</span>
        </div>
      </div>
      <HomeIcon path="message" color="#9a9e9a" />
    </div>
  );
}
