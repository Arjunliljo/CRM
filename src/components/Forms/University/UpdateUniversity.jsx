import { useState, useEffect } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import CourseSelector from "./CourserSelector";
import ImageUploader from "./ImageUploader";
import CountrySelector from "../Leads/CountrySelector";
import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import { refetchUniversity } from "../../../apiHooks/useUniversity";
import { getCountryName } from "../../../service/nameFinders";

export default function UpdateUniversity({
  isUpadte,
  closeModal,
  university,
  countries,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (university) {
      setName(university.name || "");
      setCountry(
        university.country?._id || university.country || ""
      );
      setImage(university.img || "");
    }
  }, [university]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleImageUpload = (file) => setImage(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, country, image }, "newUniversity");
    if (!name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();

      if (name !== university.name) {
        formData.append("name", name);
      }
      if (country !== university.country?._id || university.country) {
        formData.append("country", country);
      } else {
        formData.append("country", "67b99b08f4581627a3bd3341");
      }
      if (image instanceof File) {
        formData.append("img", image);
      }

      formData.append("mainFolder", "universitiesImages");
      formData.append("subFolder", name);

      const res = await apiClient.patch(
        `/university/${university._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      refetchUniversity();
      message.success("Branch updated successfully!");
      closeModal();
    } catch (e) {
      console.log(e, "e");
      message.error("Error updating branch. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            onChange={handleNameChange}
            placeholder="University Name"
            className="input-formGroup"
            required
            value={name}
          />
        </div>

        <div className="modal__form-input-text">
          <CountrySelector
            countries={countries}
            handleChange={handleCountryChange}
            defaultValue={country}
          />
        </div>
      </div>
      {/* <CourseSelector
        staticCourses={staticCourses}
        selectedCourses={selectedCourses}
        handleCourseClick={handleCourseClick}
        newUniversity={{ name, country, image }}
        isUpadte={isUpadte}
      /> */}

      <ImageUploader
        newUniversity={{ name, country, image }}
        isUpadte={isUpadte}
        image={image}
        onUpload={handleImageUpload}
      />

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit" onClick={handleSubmit}>
          {isUpadte ? "Update" : "Add"}
        </NextBtn>
      </div>
    </form>
  );
}
