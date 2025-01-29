import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoles } from "../../../../global/profileSlice";
import { useApi } from "../../../context/apiContext/ApiContext";

export default function Roles() {
  const dispatch = useDispatch();

  const {
    roleConfigs: { roles },
  } = useApi();
  const { selectedRoles } = useSelector((state) => state.profile);

  const handleRoleClick = (role) => {
    if (selectedRoles.includes(role)) {
      dispatch(setSelectedRoles(selectedRoles.filter((t) => t !== role)));
    } else {
      dispatch(setSelectedRoles([...selectedRoles, role]));
    }
  };

  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Roles</h2>
      </div>
      <div className="content-section-item-box">
        {roles?.length > 0 ? (
          roles.map((item, index) => (
            <div
              className={`form-group`}
              key={index}
              onClick={() => handleRoleClick(item)}
            >
              <div
                className={`forms-status-item ${
                  selectedRoles.some((val) => item.name === val.name)
                    ? "selected"
                    : ""
                }`}
              >
                {item.name}
              </div>
            </div>
          ))
        ) : (
          <div className="No-data">No Roles Available</div>
        )}
      </div>
    </div>
  );
}
