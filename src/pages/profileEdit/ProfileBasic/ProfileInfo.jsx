import RoleSelector from "../../../components/Selectors/UpdateUser/RoleSelector";
import {
  setProfileAutoAssign,
  setProfilePassword,
  setProfileRole,
} from "../../../../global/profileSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileInfo() {
  const { password, autoAssign } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const toggleAssign = () => {
    dispatch(setProfileAutoAssign(!autoAssign));
  };

  const handlePasswordChange = (e) => {
    dispatch(setProfilePassword(e.target.value));
  };

  const handleRoleChange = (e) => {
    dispatch(setProfileRole(e.target.value));
  };

  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2 style={{ opacity: "0" }}>Roles</h2>
      </div>
      <div className="content-section-item-box">
        <RoleSelector setter={handleRoleChange} />

        <div className="form-group">
          <input
            className="forms-select"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="auto-assign">
          <span className="span-assign">Auto Assign</span>
          <button
            className={`button-toggle ${autoAssign ? "active" : "off"}`}
            onClick={toggleAssign}
          >
            {autoAssign ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}
