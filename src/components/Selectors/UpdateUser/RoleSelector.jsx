import { useDispatch } from "react-redux";
import { useApi } from "../../../context/apiContext/ApiContext";
import SmallLoader from "../../../features/SmallLoader";
import { BsExclamation } from "react-icons/bs";

export default function RoleSelector({ setter, isCreate, profileData }) {
  const dispatch = useDispatch();

  const {
    roleConfigs: { roles },
  } = useApi();

  if (!roles) return <SmallLoader />;

  const handleChange = (event) => {
    const selectedRole = roles.find((role) => role.name === event.target.value);
    if (selectedRole) {
      dispatch(setter({ id: selectedRole._id, name: selectedRole.name }));
    }
  };

  return (
    <div className="form-group">
      <div
        className="select-wrapper"
        style={{ position: "relative", width: "100%" }}
      >
        <select
          className="forms-select"
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          <option value="">Select Role</option>
          {roles?.map((role, i) => (
            <option key={i} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        {isCreate && !profileData.role.id && (
          <BsExclamation
            className="error-icon"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
