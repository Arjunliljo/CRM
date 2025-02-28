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
    if (selectedRoles.some((t) => t._id === role._id)) {
      dispatch(setSelectedRoles(selectedRoles.filter((t) => t._id !== role._id)));
    } else {
      dispatch(setSelectedRoles([...selectedRoles, role]));
    }
  };

  const handleCreate = async () => {
    await apiClient.post("/user/create", userData);
  };

  return (
    <div className="content-section main-status-container">
      <div className="content-section-head">
        <h2>Dashboard</h2>
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
          <div className="No-data">No data available</div>
        )}
      </div>
    </div>
  );
}
