import { useState } from "react";
import CancelBtn from "../../../../components/buttons/CancelBtn";
import NextBtn from "../../../../components/buttons/NextBtn";
import StatusRow1 from "./components/StatusRow1";
import StatusRow2 from "./components/StatusRow2";
import { refetchStatuses } from "../../../../apiHooks/useStatuses";
import { message } from "antd";
import apiClient from "../../../../../config/axiosInstance";

export default function AddStatusForm({ newStatus, setNewStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(newStatus, "newStatus outside");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newStatus.name) {
      message.error("Please fill in the status name");
      return;
    }
    if (newStatus.isTab === null) {
      message.error("Please select Yes or No for Tab");
      return;
    }
    if (!newStatus.selectedClass) {
      message.error("Please select a class");
      return;
    }
    if (!newStatus.subStatuses || newStatus.subStatuses.length === 0) {
      message.error("Please add at least one sub-status");
      return;
    }

    try {
      setIsLoading(true);

      const res = await apiClient.post("/status", newStatus);

      // Reset form after successful submission
      setNewStatus({
        name: "",
        isTab: null,
        selectedClass: "",
        description: "",
        subStatuses: [],
      });

      refetchStatuses();

      message.success("Status created successfully!");
    } catch (e) {
      message.error("Error creating status. Please try again.");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Status</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="dependancies-content-row">
          <StatusRow1 newStatus={newStatus} setNewStatus={setNewStatus} />
          <StatusRow2 newStatus={newStatus} setNewStatus={setNewStatus} />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn
            onClick={() =>
              setNewStatus({
                name: "",
                isTab: null,
                selectedClass: "",
                description: "",
                subStatuses: [],
              })
            }
          >
            Cancel
          </CancelBtn>
          <NextBtn onClick={handleSubmit} isLoading={isLoading}>
            Save
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
