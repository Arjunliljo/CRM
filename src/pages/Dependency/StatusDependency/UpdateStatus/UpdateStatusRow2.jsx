import { useState } from "react";
import PrimaryBttn from "../../../../components/buttons/PrimaryBttn";

export default function UpdateStatusRow2() {
  const [subStatuses, setSubStatuses] = useState([]);
  const [subStatusInput, setSubStatusInput] = useState("");

  const handleAddSubStatus = () => {
    if (subStatusInput.trim()) {
      setSubStatuses([...subStatuses, subStatusInput.trim()]);
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
          marginTop: "3rem",
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
        {subStatuses.map((status, index) => (
          <div key={index} className="status-form-group-sub-status-element">
            {status}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
