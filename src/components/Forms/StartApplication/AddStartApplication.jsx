import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import ChooseCountry from "./ChooseCountry";
import GraduationSelector from "./GraduationSelector";
import CourseSelectorStartApplication from "./CourseSelectorStartApplication";
import ChooseUniversity from "./ChooseUniversity";
import Chooseintake from "./Chooseintake";

export default function AddStartApplication({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <ChooseCountry />
          </div>
          <div className="modal__form-input-text">
            <GraduationSelector />
          </div>
        </div>
        <div className="modal__form-input-text">
          <CourseSelectorStartApplication />
        </div>
        <div className="modal__form-input-text">
          <ChooseUniversity />
        </div>
        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <Chooseintake />
          </div>
          <div className="modal__form-input-text">
            <ChooseCountry />
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
