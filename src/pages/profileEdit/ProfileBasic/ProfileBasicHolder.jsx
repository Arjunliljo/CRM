import React from "react";
import ProfileBasic from "./ProfileBasic";
import ProfileInfo from "./ProfileInfo";

export default function ProfileBasicHolder() {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <ProfileBasic />
        <ProfileInfo />
      </div>
    </div>
  );
}
