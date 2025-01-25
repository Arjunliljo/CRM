import React, { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import { Input } from "antd";
import NextBtn from "../../buttons/NextBtn";
import CountrySelector from "./CountrySelector";
import UniversitySelector from "./UniversitySelector";

export default function AddLead({
  closeModal,
  newLead,
  setNewLead,
  handleChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newLead.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      const res = await apiClient.post("/lead", newLead);
      setNewLead({ name: "", DOM: "", Contact: "", Whatsupp: "", Mail: "" });
      refetchBranches();
      message.success("Branch created successfully!");
    } catch (e) {
      setIsLoading(false);
      message.error("Error creating branch. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="modal__form">
        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name"
              className="input-formGroup"
              required
            />
          </div>
          <div className="modal__form-input-text">
            <input
              type="text"
              name="DOM"
              onChange={handleChange}
              placeholder="DOM"
              className="input-formGroup"
              required
            />
          </div>
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="Contact"
            onChange={handleChange}
            placeholder="Contact Nunber"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="Whatsupp"
            onChange={handleChange}
            placeholder="Whatsupp Number"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="Mail"
            onChange={handleChange}
            placeholder="Mail Id"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <CountrySelector />
          </div>
          <div className="modal__form-input-text">
            <UniversitySelector />
          </div>
        </div>

        <div className="modal__form-input-text">
          <CountrySelector />
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <NextBtn>Add</NextBtn>
        </div>
      </form>
    </>
  );
}
