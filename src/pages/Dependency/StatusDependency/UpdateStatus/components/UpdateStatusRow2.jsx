import { useState } from "react";
import PrimaryBttn from "../../../../../components/buttons/PrimaryBttn";

export default function UpdateStatusRow2({ formData, setFormData }) {
  const [subStatusInput, setSubStatusInput] = useState("");
  const [subStatusColor, setSubStatusColor] = useState("#000000");

  const handleSubStatusAdd = (subStatus, color) => {
    setFormData((prev) => ({
      ...prev,
      subStatuses: [...prev.subStatuses, { subStatus: subStatus, color }],
    }));
  };

  const handleAddSubStatus = () => {
    if (subStatusInput.trim()) {
      handleSubStatusAdd(subStatusInput.trim(), subStatusColor);
      setSubStatusInput("");
      setSubStatusColor("#000000");
    }
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setSubStatusColor(value);
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
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Sub-status"
              className="input-formGroup"
              value={subStatusInput}
              onChange={(e) => setSubStatusInput(e.target.value)}
            />
            <input
              type="color"
              value={subStatusColor}
              onChange={handleColorChange}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.2rem",
                height: "1.3rem",
                padding: "0",
              }}
            />
          </div>
          <PrimaryBttn
            onClick={handleAddSubStatus}
            style={{ borderRadius: "0.6rem" }}
          >
            Add
          </PrimaryBttn>
        </div>

        <div className="status-form-group-sub-status">
          {formData.subStatuses.map((status, index) => (
            <div
              key={index}
              className="status-form-group-sub-status-element"
              style={{ backgroundColor: status.color || "#f0f0f0" }}
            >
              {status.subStatus}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
