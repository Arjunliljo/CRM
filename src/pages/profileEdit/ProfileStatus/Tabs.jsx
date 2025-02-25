import { useDispatch, useSelector } from "react-redux";
import { defaultTabs } from "../../../../api/Data/getData";
import { setSelectedTabs } from "../../../../global/profileSlice";
import { BsExclamation } from "react-icons/bs";

export default function Tabs({ isCreate }) {
  const dispatch = useDispatch();

  const { tabs } = useSelector((state) => state.status);
  const { selectedTabs } = useSelector((state) => state.profile);

  const allTabs = defaultTabs.concat(tabs);

  const handleTabClick = (tab) => {
    if (selectedTabs.includes(tab)) {
      dispatch(setSelectedTabs(selectedTabs.filter((t) => t !== tab)));
    } else {
      dispatch(setSelectedTabs([...selectedTabs, tab]));
    }
  };

  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>
          Tabs{" "}
          {isCreate && !selectedTabs?.length && (
            <BsExclamation
              className="error-icon"
              style={{ marginLeft: 0, fontSize: "20px" }}
            />
          )}
        </h2>
      </div>
      <div className="content-section-item-box">
        {allTabs?.length > 0 ? (
          allTabs.map((item, index) => (
            <div
              className={`form-group`}
              key={index}
              onClick={() => handleTabClick(item)}
            >
              <div
                className={`forms-status-item ${
                  selectedTabs.some((val) => item.name === val.name)
                    ? "selected"
                    : ""
                }`}
              >
                {item.name}
              </div>
            </div>
          ))
        ) : (
          <div className="No-data">No Tabs available</div>
        )}
      </div>
    </div>
  );
}
