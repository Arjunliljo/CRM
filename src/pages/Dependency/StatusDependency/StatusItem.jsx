import { Delete, EditOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setStatusEdit } from "../../../../global/creationSlice";
import { useState } from "react";
import { refetchStatuses } from "../../../apiHooks/useStatuses";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";

export default function StatusItem({ item, setSelectedStatus, isSelected }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(
      setStatusEdit({
        isStatusEdit: true,
        editStatus: { ...item },
      })
    );
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to delete "${item.status}"?`)) {
      return;
    }

    try {
      setIsLoading(true);
      await apiClient.delete(`/status/${item._id}`);
      message.success("Status deleted successfully!");
      refetchStatuses();
    } catch (error) {
      message.error("Error deleting status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (e) => {
    // Only set selected status if not dragging and not clicking action buttons
    if (!e.target.closest(".branch-item-actions")) {
      setSelectedStatus(item);
    }
  };

  return (
    <div
      className={`branch-item ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className="drag-handle">{item.name}</div>
      <div className="branch-item-actions">
        <EditOutlined
          sx={{ color: "darkblue", fontSize: "1.2rem" }}
          onClick={handleEdit}
        />
        <Delete
          sx={{ color: "darkblue", fontSize: "1.2rem" }}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
