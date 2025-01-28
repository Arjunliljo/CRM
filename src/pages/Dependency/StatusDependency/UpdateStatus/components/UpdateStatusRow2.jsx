import { useState } from "react";
import PrimaryBttn from "../../../../../components/buttons/PrimaryBttn";

export default function UpdateStatusRow2({ formData, setFormData }) {
  const [subStatusInput, setSubStatusInput] = useState("");
  const handleSubStatusAdd = (subStatus) => {
    setFormData((prev) => ({
      ...prev,
      subStatuses: [...prev.subStatuses, subStatus],
    }));
  };

  const handleAddSubStatus = () => {
    if (subStatusInput.trim()) {
      handleSubStatusAdd(subStatusInput.trim());
      setSubStatusInput("");
    }
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-item-box">
        <div
          className="status-form-group"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Sub-status"
            className="input-formGroup"
            value={subStatusInput}
            onChange={(e) => setSubStatusInput(e.target.value)}
          />
          <PrimaryBttn
            onClick={handleAddSubStatus}
            style={{ borderRadius: "0.6rem" }}
          >
            Add
          </PrimaryBttn>
        </div>

        <div className="status-form-group-sub-status">
          {formData.subStatuses.map((status, index) => (
            <div key={index} className="status-form-group-sub-status-element">
              {status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
