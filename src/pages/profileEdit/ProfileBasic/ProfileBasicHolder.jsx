import React from "react";
import ProfileBasic from "./ProfileBasic";
import ProfileInfo from "./ProfileInfo";
import BranchSelector from "../ProfileDynamicSelectors/BranchSelector";
import CountrySelector from "../ProfileDynamicSelectors/CountrySelector";

export default function ProfileBasicHolder() {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <ProfileBasic />
        <ProfileInfo />
      </div>
      <div className="profile-content-dynamic">
        <BranchSelector />
        <CountrySelector />
      </div>
    </div>
  );
}
