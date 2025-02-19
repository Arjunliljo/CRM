import { useState, useEffect } from "react";
import StatusItem from "./StatusItem";
import { Delete } from "@mui/icons-material";
import { useApi } from "../../../context/apiContext/ApiContext";
import { refetchStatuses } from "../../../apiHooks/useStatuses";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";
import {
  handleDragEnd,
  handleDragLeave,
  handleDragOver,
  handleDragStart,
  handleDrop,
} from "../../../components/handlers/dragabbleHandlers";

export default function StatusNames() {
  const {
    statusConfigs: { statuses },
  } = useApi();
  const [localStatuses, setLocalStatuses] = useState(statuses);
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // // Initialize local statuses when the API data loads
  // useEffect(() => {
  //   if (statuses?.length > 0) {
  //     setLocalStatuses(statuses);
  //     if (!selectedStatus) {
  //       setSelectedStatus(statuses[0]);
  //     }
  //   }
  // }, []);

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

  const handlePriorityChange = async (e, i, status) => {
    // First handle the UI update
    handleDrop(
      e,
      i,
      localStatuses,
      setLocalStatuses,
      selectedStatus,
      setSelectedStatus
    );
  };

  useEffect(() => {
    async function updateStatuses() {
      try {
        // Create an array of promises for updating all statuses
        const updatePromises = localStatuses.map((status, index) =>
          apiClient.patch(`/status/${status._id}`, {
            priority: index + 1,
          })
        );

        // Wait for all updates to complete
        await Promise.all(updatePromises);
        // message.success("Status priorities updated successfully");

        // Optionally refetch to ensure server state
        // refetchStatuses();
      } catch (error) {
        message.error(
          "Failed to update status priorities, please refresh the page"
        );
        console.error("Error updating priorities:", error);
      }
    }
    updateStatuses();
    console.log(localStatuses, "localStatuses");
  }, [localStatuses]);
  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          <div className="content-section-head">
            <h2>All Status</h2>
          </div>
          {localStatuses?.map((val, i) => (
            <div
              key={i}
              className={`status-item ${
                selectedStatus === val ? "selected" : ""
              }`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, i, setDraggedIndex)}
              onDragEnd={(e) => handleDragEnd(e, setDraggedIndex)}
              onDragOver={(e) => handleDragOver(e, i, draggedIndex)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handlePriorityChange(e, i, val)}
            >
              <StatusItem
                item={val}
                setSelectedStatus={setSelectedStatus}
                isSelected={selectedStatus === val}
              />
            </div>
          ))}
        </div>

        <div className="dependancies-branch-names-left">
          <div className="content-section-head">
            <h2>Sub Status</h2>
          </div>
          {selectedStatus ? (
            <>
              {selectedStatus.subStatuses.map((subStatus, index) => (
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
