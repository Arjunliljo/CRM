import { useState } from "react";
import CountryBtn from "../../../components/buttons/CountryBtn";

export default function StatusRow() {
  const [isTab, setIsTab] = useState(null); // Yes/No selection
  const [selectedClass, setSelectedClass] = useState(""); // Class selection

  const handleTabSelection = (value) => setIsTab(value);
  const handleClassSelection = (cls) => setSelectedClass(cls);

  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2>Add New Status</h2>
      </div>

      <div className="content-section-item-box">
        <div className="form-group">
          <input type="text" placeholder="Status name" className="input-formGroup" />
        </div>

        <div className="form-group">
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

        <div className="form-group">
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
        <div className="form-group">
          <input type="text" placeholder="Description" className="input-formGroup" />
        </div>


      </div>
    </div>
  );
}
