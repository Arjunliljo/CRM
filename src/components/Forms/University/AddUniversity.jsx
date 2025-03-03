import { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import CourseSelector from "./CourserSelector";
import ImageUploader from "./ImageUploader";
import CountrySelector from "../Leads/CountrySelector";
import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import { refetchUniversity } from "../../../apiHooks/useUniversity";

export default function AddUniversity({ closeModal, countries }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [newUniversity, setNewUniversity] = useState({ name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUniversity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      setNewUniversity((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUniversity.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("name", newUniversity.name);
      formData.append("country", newUniversity.country);

      if (newUniversity.img) {
        formData.append("img", newUniversity.img);
      }

      // Debugging: Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Use formData in the post request
      formData.append("mainFolder", "universitiesImages");
      formData.append("subFolder", newUniversity.name);
      const res = await apiClient.post("/university", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewUniversity({ name: "" });
      refetchUniversity();
      message.success("Branch created successfully!");
      closeModal();
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
            value={newUniversity.name}
            onChange={handleChange}
            placeholder="University Name"
            className="input-formGroup"
            required
          />
        </div>
        <div className="modal__form-input-text">
          <CountrySelector countries={countries} handleChange={handleChange} />
        </div>
      </div>

      <ImageUploader onUpload={handleImageUpload} />

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit" onClick={handleSubmit}>
          Add
        </NextBtn>
      </div>
    </form>
  );
}
