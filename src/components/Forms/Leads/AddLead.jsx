import React from "react";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import { Input } from "antd";
import NextBtn from "../../buttons/NextBtn";
import CountrySelector from "./CountrySelector";
import UniversitySelector from "./UniversitySelector";

export default function AddLead({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-formGroup"
              required
            />
          </div>
          <div className="modal__form-input-text">
            <input
              type="text"
              name="name"
              placeholder="DOM"
              className="input-formGroup"
              required
            />
          </div>
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            placeholder="Contact Nunber"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            placeholder="Whatsupp Number"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
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
          <NextBtn>Add Lead</NextBtn>
        </div>
      </form>
    </>
  );
}
