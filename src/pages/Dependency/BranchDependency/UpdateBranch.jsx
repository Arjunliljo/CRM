import { useState } from "react";
import { message } from "antd";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";
import apiClient from "../../../../config/axiosInstance";
import { refetchBranches } from "../../../apiHooks/useBranches";
import { useSelector } from "react-redux";

export default function UpdateBranch() {
  const [isLoading, setIsLoading] = useState(false);
  const { editBranch } = useSelector((state) => state.creation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editBranch.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      await apiClient.post("/branch", editBranch);
      setIsLoading(false);
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
        <h2>Update Branch</h2>
      </div>

      <form onSubmit={handleSubmit} className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={editBranch.name}
            placeholder="Branch Name"
            className="input-formGroup"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={editBranch.description}
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn onClick={() => {}}>Cancel</CancelBtn>
          <NextBtn onClick={handleSubmit} isLoading={isLoading}>
            Save
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
