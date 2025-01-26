import { useState } from "react";
import CountrySelector from "../../../components/Selectors/UpdateUser/CountrySelector";

export default function ProfileInfo() {
  const [isActive, setIsActive] = useState(false);

  const toggleAssign = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2>Roles</h2>
      </div>
      <div className="content-section-item-box">
        <div className="form-group">
          <select className="forms-select">
            <option value="" disabled selected>
              Role
            </option>
          </select>
        </div>
        <div className="form-group">
          <select className="forms-select">
            <option value="" disabled selected>
              Branch
            </option>
          </select>
        </div>
        <CountrySelector />
        <div className="form-group">
          <input className="forms-select" placeholder="Login ID" />
        </div>
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
