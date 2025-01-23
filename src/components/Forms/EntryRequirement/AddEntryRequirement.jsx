import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";

export default function AddEntryRequirement({ closeModal }) {
  return (
    <>
      <form className="modal__form">

        <div className="modal__form-input">
          <Input placeholder="Course" />
        </div>


        <div className="modal__form-row">
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Standard">
              <option value="india">Plus two</option>

            </select>
          </div>

          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Percentage">
              <option value="ug">45%</option>

            </select>
          </div>
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>
            Cancel
          </CancelBtn>
          <PrimaryBttn type="submit">
            Add
          </PrimaryBttn>
        </div>
      </form >
    </>
  );
}
