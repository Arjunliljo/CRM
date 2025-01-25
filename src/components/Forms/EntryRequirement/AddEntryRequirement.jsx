import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import QualificationSelector from "./QualificationSelector";
import PercentageSelector from "./PercentageSelector";

export default function AddEntryRequirement({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <QualificationSelector />
          </div>

          <div className="modal__form-input-text">
            <PercentageSelector />
          </div>
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <PrimaryBttn type="submit">Add</PrimaryBttn>
        </div>
      </form>
    </>
  );
}
