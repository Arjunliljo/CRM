import { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import CourseSelector from "./CourserSelector";
import ImageUploader from "./ImageUploader";
import CountrySelector from "./CountrySelect";

export default function UpdateUniversity({
  isUpadte,
  closeModal,
  newUniversity,
  setNewUniversity,
  handleChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUniversity.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      const res = await apiClient.post("/university", newUniversity);
      setNewUniversity({ name: "" });
      refetchUniversity();
      message.success("Branch created successfully!");
    } catch (e) {
      message.error("Error creating branch. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const staticCourses = [
    { name: "DS", fullName: "Data Science" },
    { name: "GD", fullName: "Graphic Design" },
    { name: "CS", fullName: "Cybersecurity" },
    { name: "AI", fullName: "AI & Machine Learning" },
  ];

  const handleCourseClick = (course) => {
    setSelectedCourses((prev) =>
      prev.some((c) => c.name === course.name)
        ? prev.filter((c) => c.name !== course.name)
        : [...prev, course]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="University Name"
            className="input-formGroup"
            required
            value={newUniversity.name}
          />
        </div>

        <div className="modal__form-input-text">
          <CountrySelector />
        </div>
      </div>
      <CourseSelector
        staticCourses={staticCourses}
        selectedCourses={selectedCourses}
        handleCourseClick={handleCourseClick}
        newUniversity={newUniversity}
        isUpadte={isUpadte}
      />

      <ImageUploader newUniversity={newUniversity} isUpadte={isUpadte} />

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit" onClick={handleSubmit}>
          {isUpadte ? "Update" : "Add"}
        </NextBtn>
      </div>
    </form>
  );
}
