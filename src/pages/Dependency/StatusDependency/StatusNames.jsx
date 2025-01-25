import { useState, useEffect } from "react";
import StatusItem from "./StatusItem";
import { Delete } from "@mui/icons-material";
import { useApi } from "../../../context/apiContext/ApiContext";
import { refetchStatuses } from "../../../apiHooks/useStatuses";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";

export default function StatusNames({ setNewStatus }) {
  const {
    statusConfigs: { isLoading, statuses },
  } = useApi();

  const [selectedStatus, setSelectedStatus] = useState(null);

  // Set the first status as default when statuses are available
  useEffect(() => {
    if (statuses?.length > 0 && !selectedStatus) {
      setSelectedStatus(statuses[0]);
    }
  }, [statuses, selectedStatus]);

  const handleDeleteSubstatus = async (subStatus) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the substatus "${subStatus}"?`
      )
    ) {
      return;
    }
    try {
      await apiClient.delete(`/status/substatus/${subStatus}`);
      message.success(`Substatus "${subStatus}" deleted!`);
      refetchStatuses();
    } catch (error) {
      message.error("Error deleting status. Please try again.");
    }
  };

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          <div className="content-section-head">
            <h2>All Status</h2>
          </div>
          {statuses?.map((val, i) => (
            <div
              key={i}
              className={`status-item ${
                selectedStatus === val ? "selected" : ""
              }`}
              onClick={() => setSelectedStatus(val)}
            >
              <StatusItem
                key={i}
                item={val}
                setSelectedStatus={setSelectedStatus}
                isSelected={selectedStatus === val}
              />
            </div>
          ))}
        </div>

        <div className="dependancies-branch-names-left">
          <div
            className="content-section-head"
          >
            <h2>Sub Status</h2>
          </div>
          {selectedStatus ? (
            <>
              {selectedStatus.subStatus.map((subStatus, index) => (
                <div key={index} className="branch-item">
                  <div>{subStatus}</div>
                  <div className="branch-item-actions">
                    <Delete
                      sx={{ color: "darkblue", fontSize: "1.2rem" }}
                      onClick={() => handleDeleteSubstatus(subStatus)}
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <span className="dependancies-branch-names-left-warning">
              Select a status to view substatuses
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
