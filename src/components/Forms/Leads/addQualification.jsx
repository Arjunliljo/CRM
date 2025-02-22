import React, { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import NextBtn from "../../buttons/NextBtn";

export default function AddQualification({ closeModal, onSubmit }) {
  const [newCardDetails, setNewCardDetails] = useState({
    name: "",
    mark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      ...newCardDetails,
    };
    onSubmit(newCard);
    setNewCardDetails({ name: "", mark: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            value={newCardDetails.name}
            onChange={handleChange}
            placeholder="Enter Subject"
            className="input-formGroup"
            required
          />
        </div>
        <div className="modal__form-input-text">
          <input
            type="text"
            name="mark"
            value={newCardDetails.mark}
            onChange={handleChange}
            placeholder="Percentage"
            className="input-formGroup"
            required
          />
        </div>
      </div>
      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit">Add</NextBtn>
      </div>
    </form>
  );
}
