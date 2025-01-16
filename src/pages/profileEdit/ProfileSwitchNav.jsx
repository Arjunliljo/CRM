import React from "react";

export default function ProfileSwitchNav() {
  return (
    <div className="profile-nav">
      <button className="nav-item profile-active">Profile</button>
      <button className="nav-item">Status</button>
      <button className="nav-item">Dashboard</button>
    </div>
  );
}
