import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";

export default function AddCourse({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-input">
          <Input placeholder="Course" />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input">
            <Input placeholder="Fees" />
          </div>

          <div className="modal__form-input">
            <select
              className="modal__form-input-select"
              placeholder="Degree Type"
            >
              <option value="ug">UG</option>
              <option value="pg">PG</option>
              <option value="phd">PhD</option>
            </select>
          </div>
        </div>
        <div className="modal__form-row">
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Status">
              <option value="ug">Stay Back</option>
            </select>
          </div>
          <div className="modal__form-input">
            <Input placeholder="Remark" />
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
