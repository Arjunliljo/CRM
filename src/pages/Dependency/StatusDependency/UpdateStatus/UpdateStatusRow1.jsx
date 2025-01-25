import { useState } from "react";
import CancelBtn from "../../../../components/buttons/CancelBtn";
import NextBtn from "../../../../components/buttons/NextBtn";
import { setBranchEdit } from "../../../../../global/creationSlice";
import { useDispatch } from "react-redux";

export default function UpdateStatusRow1() {
  const [isTab, setIsTab] = useState(null); // Yes/No selection
  const [selectedClass, setSelectedClass] = useState(""); // Class selection
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTabSelection = (value) => setIsTab(value);
  const handleClassSelection = (cls) => setSelectedClass(cls);
    const handleCancel = () => {
      dispatch(setBranchEdit({ isBranchEdit: false, editBranch: {} }));
    };
  

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Update Status</h2>
      </div>


      <form className="dependancies-status-box">
        <div className="status-form-group">
          <input type="text" placeholder="Status name" className="input-formGroup" />
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
          <CancelBtn onClick={handleCancel}>Discard</CancelBtn>
          <NextBtn type="submit" isLoading={isLoading}>
            Update
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
