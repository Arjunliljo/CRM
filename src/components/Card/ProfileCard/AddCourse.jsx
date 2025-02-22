import { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import QualificationSelector from "./QualificationSelect";
import UniversitySelector from "./UniversitySelect";
export default function AddCourse({ closeModal, handleChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSubmit = async (e) => {
    closeModal();
    // e.preventDefault();
    // if (!newUniversity.name) {
    //   message.error("Please fill in the branch name");
    //   return;
    // }
    // try {
    //   setIsLoading(true);
    //   const res = await apiClient.post("/university", newUniversity);
    //   setNewUniversity({ name: "" });
    //   refetchUniversity();
    //   message.success("Branch created successfully!");
    // } catch (e) {
    //   message.error("Error creating branch. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="modal__form">
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
      <div className="modal__form-input-text">
        <QualificationSelector />
      </div>
      <div className="modal__form-input-text">
        <UniversitySelector />
      </div>

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit" onClick={handleSubmit}>
          Add
        </NextBtn>
      </div>
    </form>
  );
}
