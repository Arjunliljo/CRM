import { useState } from "react";
import MainStatus from "./MainStatus";
import Tabs from "./Tabs";
import { useSelector } from "react-redux";
import Roles from "./Roles";

export default function ProfileStatusHolder({ isCreate }) {
  const { statuses } = useSelector((state) => state.status);

  const [selectedStatus, setSelectedStatus] = useState(statuses[0].name || "");

  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <MainStatus
          setSelected={setSelectedStatus}
          selectedStatus={selectedStatus}
          statuses={statuses}
          isCreate={isCreate}
        />
        <Tabs isCreate={isCreate} />
        <Roles isCreate={isCreate} />
      </div>
    </div>
  );
}
