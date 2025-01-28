import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../../../context/apiContext/ApiContext";
import { setSelectedRoles } from "../../../../global/profileSlice";
import { useCreateUser } from "../../../hooks/useCreateUser";
import apiClient from "../../../../config/axiosInstance";

export default function DashBoardSelect() {
  const dispatch = useDispatch();

  const userData = useCreateUser();

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

  const handleCreate = async () => {
    const response = await apiClient.post("/user/create", userData);
  };

  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Dashboard</h2>
      </div>
      <div className="content-section-item-box">
        {roles.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
}
