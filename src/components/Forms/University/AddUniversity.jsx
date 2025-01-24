import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import NextBtn from "../../buttons/NextBtn";
import CountrySelectorUniversity from "./CountrySelectorUniversity";
import DegreeSelector from "./DegreeSelector";

export default function AddUniversity({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            placeholder="University Name"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <CountrySelectorUniversity />
          </div>

          <div className="modal__form-input-text">
            <DegreeSelector />
          </div>
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <NextBtn type="submit">Add</NextBtn>
        </div>
      </form>
    </>
  );
}
