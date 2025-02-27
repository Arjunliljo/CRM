import { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import UniversitySelector from "./UniversitySelect";
import apiClient from "../../../../config/axiosInstance";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useApi } from "../../../context/apiContext/ApiContext";
import PopoverContent from "../../../pages/Dependency/StatusDependency/AddStatus/components/PopoverContent";

export default function AddCourse({ closeModal, handleChange, handleSubmit }) {
  const [qualification, setQualification] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    qualificationsConfigs: { qualifications },
  } = useApi();
  // const {
  //   universityConfigs: { university },
  // } = useApi();

console.log(qualifications, "qualifications array");

  const [selectedQualification, setSelectedQualification] = useState([]);
  console.log(selectedQualification, "qualifications");

  // const [selectedUniversities, setSelectedUniversities] = useState([]);
  // const [isUniversityPopoverOpen, setIsUniversityPopoverOpen] = useState(false);

  const toggleQualificationSelection = (qualification) => {
    setSelectedQualification((prev) => {
      if (prev.some((q) => q._id === qualification._id)) {
        return prev.filter((q) => q._id !== qualification._id);
      } else {
        return [...prev, qualification];
      }
    });
  };

  // const handleUniversitySelect = () => {
  //   setSelectedUniversities([...selectedUniversities]);
  //   setIsUniversityPopoverOpen(false);
  // };

  // const removeSelectedUniversity = (university) => {
  //   setSelectedUniversities((prev) =>
  //     prev.filter((u) => u._id !== university._id)
  //   );
  // };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const qualificationIds = selectedQualification.map((qual) => qual._id);
    // const universityIds = selectedUniversities.map((uni) => uni._id);
    handleSubmit({
      qualification: qualificationIds,
      // university: universityIds,
    });
  };

  return (
    <form onSubmit={handleCourseSubmit} className="modal__form">
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Course Name"
            className="input-formGroup"
            required
          />
        </div>
      </div>
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="fee"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = value;
              handleChange(e);
            }}
            placeholder="Fee"
            className="input-formGroup"
            required
          />
        </div>
      </div>
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="duration"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = value;
              handleChange(e);
            }}
            placeholder="Duration"
            className="input-formGroup"
            required
          />
        </div>
      </div>
      <div className="modal__form-input-text" style={{ position: "relative" }}>
        <div
          className="input-formGroup"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "10px",
          }}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <span>Select Qualification</span>
          <span
            style={{
              transform: isPopoverOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>
        {isPopoverOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1000,
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {qualifications.map((qualification) => (
              <div
                key={qualification._id}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: selectedQualification.some(
                    (q) => q._id === qualification._id
                  )
                    ? "#e6f7ff"
                    : "white",
                }}
                onClick={() => toggleQualificationSelection(qualification)}
              >
                {qualification.name}
              </div>
            ))}
          </div>
        )}
        {selectedQualification.length > 0 && (
          <div
            style={{
              marginTop: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "5px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {selectedQualification.map((qualification) => (
              <div
                key={qualification._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px",
                  margin: "2px",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <span>{qualification.name}</span>
                <span
                  style={{ cursor: "pointer", color: "red", marginLeft: "5px" }}
                  onClick={() => toggleQualificationSelection(qualification)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div className="modal__form-input-text" style={{ position: "relative" }}>
        <div
          className="input-formGroup"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "10px",
          }}
          onClick={() => setIsUniversityPopoverOpen(!isUniversityPopoverOpen)}
        >
          <span>Select University</span>
          <span
            style={{
              transform: isUniversityPopoverOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>
        {isUniversityPopoverOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1000,
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <PopoverContent
              selectedCountry={selectedUniversities}
              setSelectedCountry={setSelectedUniversities}
              onSelect={handleUniversitySelect}
              onCancel={() => {
                setIsUniversityPopoverOpen(false);
                setSelectedUniversities([]);
              }}
              formData={""}
              contents={university} // Pass university array
            />
          </div>
        )}
        {selectedUniversities.length > 0 && (
          <div
            style={{
              marginTop: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "5px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {selectedUniversities.map((university) => (
              <div
                key={university._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px",
                  margin: "2px",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <span>{university.name}</span>
                <span
                  style={{ cursor: "pointer", color: "red", marginLeft: "5px" }}
                  onClick={() => removeSelectedUniversity(university)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        )}
      </div> */}

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit">
          Add
        </NextBtn>
      </div>
    </form>
  );
}
