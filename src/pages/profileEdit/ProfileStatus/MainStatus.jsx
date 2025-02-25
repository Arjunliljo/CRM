import { useDispatch, useSelector } from "react-redux";
import { setProfileMainStatus } from "../../../../global/profileSlice";
import { BsExclamation } from "react-icons/bs";

export default function MainStatus({ statuses, isCreate }) {
  const dispatch = useDispatch();
  const selectedStatuses = useSelector((state) => state.profile.mainStatuses);

  const handleSelected = (item) => {
    const isSelected = selectedStatuses?.some((obj) => obj.name === item.name);
    const updatedStatuses = isSelected
      ? selectedStatuses.filter((status) => status.name !== item.name)
      : [...selectedStatuses, item];

    dispatch(setProfileMainStatus(updatedStatuses));
  };

  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>
          Main Status{" "}
          {isCreate && !selectedStatuses?.length && (
            <BsExclamation
              className="error-icon"
              style={{ marginLeft: 0, fontSize: "20px" }}
            />
          )}
        </h2>
      </div>
      <div className="content-section-item-box">
        {statuses?.length > 0 ? (
          statuses.map((item, index) => (
            <div
              className={`form-group`}
              key={index}
              onClick={() => handleSelected(item)}
            >
              <div
                className={`forms-status-item ${
                  selectedStatuses.some((obj) => obj.name === item.name)
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
