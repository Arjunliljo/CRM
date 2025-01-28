import { useState } from "react";
import MainStatus from "./MainStatus";
import Tabs from "./Tabs";
import { useSelector } from "react-redux";

export default function ProfileStatusHolder() {
  const { statuses } = useSelector((state) => state.status);

  const [selectedStatus, setSelectedStatus] = useState(statuses[0].name || "");

  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <MainStatus
          setSelected={setSelectedStatus}
          selectedStatus={selectedStatus}
          statuses={statuses}
        />
        {/* <SubStatus /> */}
        <Tabs />
      </div>
    </div>
  );
}
