import { useState } from "react";
import CancelBtn from "../../../../components/buttons/CancelBtn";
import NextBtn from "../../../../components/buttons/NextBtn";

export default function StatusRow1() {
  const [isTab, setIsTab] = useState(null); // Yes/No selection
  const [selectedClass, setSelectedClass] = useState(""); // Class selection

  const handleTabSelection = (value) => setIsTab(value);
  const handleClassSelection = (cls) => setSelectedClass(cls);

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Status</h2>
      </div>

      <form className="dependancies-status-box">
        <div className="status-form-group">
          <input
            type="text"
            placeholder="Status name"
            className="input-formGroup"
          />
        </div>

        <div className="status-form-group">
          <p>Is Tab?</p>
          <div className="tab-buttons">
            <button
              className={isTab === "Yes" ? "active" : ""}
              onClick={() => handleTabSelection("Yes")}
            >
              Yes
            </button>
            <button
              className={isTab === "No" ? "active" : ""}
              onClick={() => handleTabSelection("No")}
            >
              No
            </button>
          </div>
        </div>

        <div className="status-form-group">
          <p>Select 1 class</p>
          <div className="class-select">
            {["Early", "Moderate", "Middle", "Finish"].map((cls) => (
              <button
                key={cls}
                className={selectedClass === cls ? "selected" : ""}
                onClick={() => handleClassSelection(cls)}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
        <div className="status-form-group">
          <textarea placeholder="Description"></textarea>
        </div>
        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn>Cancel</CancelBtn>
          <NextBtn style={{ backgroundColor: "#0075fc" }}>Save</NextBtn>
        </div>
      </form>
    </div>
  );
}
