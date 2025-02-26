import RoleSelector from "../../../components/Selectors/UpdateUser/RoleSelector";
import {
  setProfileAutoAssign,
  setProfilePassword,
  setProfileRole,
} from "../../../../global/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsExclamation } from "react-icons/bs";

export default function ProfileInfo({ isCreate }) {
  const { password, autoAssign } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile);



  const toggleAssign = () => {
    dispatch(setProfileAutoAssign(!autoAssign));
  };

  const handlePasswordChange = (e) => {
    dispatch(setProfilePassword(e.target.value));
  };

  const handleRoleChange = (e) => {
    dispatch(setProfileRole(e));
  };

  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2 style={{ opacity: "0" }}>Roles</h2>
      </div>
      <div className="content-section-item-box">
        <RoleSelector
          setter={handleRoleChange}
          isCreate={isCreate}
          profileData={profileData}
        />

        <div className="form-group">
          <div className="password-input">
            <input
              className="forms-select"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <BsExclamation
              className="error-icon"
              style={{
                display: isCreate && !profileData.password ? "block" : "none",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
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
