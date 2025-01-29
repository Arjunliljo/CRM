import { useState } from "react";
import { message } from "antd";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";
import apiClient from "../../../../config/axiosInstance";
import { refetchBranches } from "../../../apiHooks/useBranches";

export default function Branch({ newBranch, setNewBranch, handleChange }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBranch.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      await apiClient.post("/branch", newBranch);
      setNewBranch({ name: "", description: "" });
      refetchBranches();
      message.success("Branch created successfully!");
    } catch (e) {
      setIsLoading(false);
      message.error("Error creating branch. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Branch</h2>
      </div>

      <form onSubmit={handleSubmit} className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newBranch.name}
            onChange={handleChange}
            placeholder="Branch Name"
            className="forms-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={newBranch.description}
            onChange={handleChange}
            className="forms-input"
            required
          />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn
            onClick={() => setNewBranch({ name: "", description: "" })}
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
