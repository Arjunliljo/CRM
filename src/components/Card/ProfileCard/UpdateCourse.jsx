import { useState, useEffect } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import { useApi } from "../../../context/apiContext/ApiContext";

export default function UpdateCourse({ closeModal, handleChange, handleSubmit, courseData, setCourse }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fee: "",
    duration: ""
  });

  const {
    qualificationsConfigs: { qualifications },
  } = useApi();

  const [selectedQualification, setSelectedQualification] = useState([]);

  // Initialize form with existing course data
  useEffect(() => {
    if (courseData) {
      // Set form data from courseData
      setFormData({
        name: courseData.name || "",
        fee: courseData.fee || "",
        duration: courseData.duration || ""
      });

      // Pre-populate selected qualifications
      const preSelectedQualifications = qualifications.filter(qual =>
        courseData.qualification.includes(qual._id)
      );
      setSelectedQualification(preSelectedQualifications);
    }
  }, [courseData, qualifications]);

  const toggleQualificationSelection = (qualification) => {
    setSelectedQualification((prev) => {
      if (prev.some((q) => q._id === qualification._id)) {
        return prev.filter((q) => q._id !== qualification._id);
      } else {
        return [...prev, qualification];
      }
    });
  };

  // Handle input changes and update both local state and parent component state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update local form state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update parent state via the provided handleChange function
    handleChange(e);

    // Also update the editCourse state with the latest values
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const qualificationIds = selectedQualification.map((qual) => qual._id);

    // Combine form data with qualifications
    const updatedData = {
      ...formData,
      qualification: qualificationIds,
      _id: courseData._id // Make sure to include the course ID
    };

    // Submit the combined data
    handleSubmit(updatedData);
  };

  return (
    <form onSubmit={handleCourseSubmit} className="modal__form">
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            placeholder="Course Name"
            className="input-formGroup"
            value={formData.name}
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
              handleInputChange(e);
            }}
            placeholder="Fee"
            className="input-formGroup"
            value={formData.fee}
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
              handleInputChange(e);
            }}
            placeholder="Duration"
            className="input-formGroup"
            value={formData.duration}
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

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit">
          Update
        </NextBtn>
      </div>
    </form>
  );
}