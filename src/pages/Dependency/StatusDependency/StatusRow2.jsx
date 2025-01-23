import { useState } from "react";
import CountryBtn from "../../../components/buttons/CountryBtn";
import PrimaryBttn from "../../../components/buttons/PrimaryBttn";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";

export default function StatusRow2() {
  const [subStatuses, setSubStatuses] = useState([]);
  const [subStatusInput, setSubStatusInput] = useState("");

  const handleAddSubStatus = () => {
    if (subStatusInput.trim()) {
      setSubStatuses([...subStatuses, subStatusInput.trim()]);
      setSubStatusInput("");
    }
  };

  return (
    <div className="content-section">
      <div className="content-section-head"></div>

      <div className="content-section-item-box">
        <div
          className="form-group"
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Sub-status"
            className="input-formGroup"
            value={subStatusInput}
            onChange={(e) => setSubStatusInput(e.target.value)}
          />
          <PrimaryBttn onClick={handleAddSubStatus}>Add</PrimaryBttn>
        </div>

        <div className="form-group-sub-status">
          {subStatuses.map((status, index) => (
            <div key={index} className="form-group-sub-status-element">
              {status}
            </div>
          ))}
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn>Cancel</CancelBtn>
          <NextBtn style={{ backgroundColor: "#0075fc" }}>Save</NextBtn>
        </div>
      </div>
    </div>
  );
}
