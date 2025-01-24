import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";

export default function AddStartApplication({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-row">
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Status">
              <option value="ug">Choose country</option>
            </select>
          </div>
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Status">
              <option value="ug">Graduation</option>
            </select>
          </div>
        </div>
        <div className="modal__form-input">
          <select className="modal__form-input-select" placeholder="Status">
            <option value="ug">Course</option>
          </select>
        </div>
        <div className="modal__form-input">
          <select className="modal__form-input-select" placeholder="Status">
            <option value="ug">University</option>
          </select>
        </div>
        <div className="modal__form-row">
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Status">
              <option value="ug">Intake</option>
            </select>
          </div>
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Status">
              <option value="ug">Choose country </option>
            </select>
          </div>
        </div>
        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <PrimaryBttn type="submit">Start Application</PrimaryBttn>
        </div>
      </form>
    </>
  );
}
