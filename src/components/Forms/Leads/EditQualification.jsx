import React, { useState, useEffect } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";


export default function EditQualification({ card, closeModal, onSubmit }) {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    mark: "",
  });

  useEffect(() => {
    if (card) {
      setCardDetails({
        name: card.name || "",
        mark: card.mark || "",
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...cardDetails, _id: card._id });

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="modal__form-row">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            value={cardDetails.name}
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
            value={cardDetails.mark}
            onChange={handleChange}
            placeholder="Percentage"
            className="input-formGroup"
            required
          />
        </div>
      </div>
      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <PrimaryBttn type="submit">Save</PrimaryBttn>
      </div>
    </form>
  );
}
