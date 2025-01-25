import { useState } from "react";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";
import apiClient from "../../../../config/axiosInstance";
import { refetchCountries } from "../../../apiHooks/useCountries";
import { message } from "antd";

export default function Country({ newCountry, setNewCountry, handleChange }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/country", newCountry);
      setIsLoading(true);
      setNewCountry({ name: "", description: "" });
      refetchCountries();
      message.success("Country created successfully!");
    } catch (e) {
      message.error("Error creating country. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Country</h2>
      </div>

      <form onSubmit={handleSubmit} className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newCountry.name}
            onChange={handleChange}
            placeholder="Country Name"
            className="input-formGroup"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={newCountry.description}
            onChange={handleChange}
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn
            onClick={() => setNewCountry({ name: "", description: "" })}
          >
            Cancel
          </CancelBtn>
          <NextBtn onClick={handleSubmit} isLoading={isLoading}>
            Save
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
