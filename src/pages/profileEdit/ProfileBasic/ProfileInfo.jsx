import { useState } from "react";
import RoleSelector from "../../../components/Selectors/UpdateUser/RoleSelector";
import { setProfileRole } from "../../../../global/profileSlice";

export default function ProfileInfo() {
  const [isActive, setIsActive] = useState(false);

  const toggleAssign = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2 style={{ opacity: "0" }}>Roles</h2>
      </div>
      <div className="content-section-item-box">
        <RoleSelector setter={setProfileRole} />

        <div className="form-group">
          <input className="forms-select" placeholder="Password" />
        </div>
        <div className="auto-assign">
          <span className="span-assign">Auto Assign</span>
          <button
            className={`button-toggle ${isActive ? "active" : "off"}`}
            onClick={toggleAssign}
          >
            {isActive ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}
