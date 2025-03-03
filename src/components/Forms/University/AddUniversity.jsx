import { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";
import ImageUploader from "./ImageUploader";
import CountrySelector from "../Leads/CountrySelector";
import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import { refetchUniversity } from "../../../apiHooks/useUniversity";

export default function AddUniversity({ closeModal, countries }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleAboutChange = (e) => setAbout(e.target.value);

  const handleImageUpload = (file) => {
    console.log("Image file received:", file); // Debug log
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      message.error("Please fill in the university name");
      return;
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();

      formDataToSend.append("name", name);
      formDataToSend.append("country", country || "67b99b08f4581627a3bd3341");
      formDataToSend.append("about", about);
      formDataToSend.append("mainFolder", "universitiesImages");
      formDataToSend.append("subFolder", name);

      if (image) {
        console.log("Appending image:", image); // Debug log
        formDataToSend.append("img", image);
      }

      // Debug log for FormData
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await apiClient.post("/university", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data); // Debug log

      setName("");
      setCountry("");
      setAbout("");
      setImage(null);

      refetchUniversity();
      message.success("University created successfully!");
      closeModal();
    } catch (e) {
      console.error("Error creating university:", e);
      message.error("Error creating University. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="University Name"
            className="input-formGroup"
            required
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
      <div className="modal__form-row">
        <div className="modal__form-textarea">
          <textarea
            name="about"
            value={about}
            onChange={handleAboutChange}
            placeholder="About the University..."
            rows="4"
            maxLength="500"
          />
        </div>
      </div>
      <div>
        <ImageUploader
          onUpload={handleImageUpload}
          image={image}
        />
      </div>

      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </NextBtn>
      </div>
    </form>
  );
}
