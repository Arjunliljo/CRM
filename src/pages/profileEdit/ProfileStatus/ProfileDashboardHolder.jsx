import { useState } from "react";
import MainStatus from "./MainStatus";
import Tabs from "./Tabs";
import { useSelector } from "react-redux";
import Roles from "./Roles";
import DashBoardSelect from "./DashBoardSelect";

export default function ProfileDashboardHolder() {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <DashBoardSelect />
      </div>
    </div>
  );
}
