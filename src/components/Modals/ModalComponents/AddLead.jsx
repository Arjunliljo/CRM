import React from "react";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import { Input } from "antd";
import NextBtn from "../../buttons/NextBtn";

export default function AddLead({ closeModal }) {
  return (
    <>
      <form className="modal__form">
        <div className="modal__form-row">
          <div className="modal__form-input">
            <Input placeholder="Name" />
          </div>
          <div className="modal__form-input">
            <Input placeholder="DOB" />
          </div>
        </div>

        <div className="modal__form-input">
          <Input placeholder="Contact Number" />
        </div>

        <div className="modal__form-input">
          <Input placeholder="Whatsapp Number" />
        </div>

        <div className="modal__form-input">
          <Input placeholder="Mail Id" />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input">
            <select className="modal__form-input-select" placeholder="Country">
              <option value="india">India</option>
              <option value="usa">USA</option>
            </select>
          </div>
          <div className="modal__form-input">
            <select
              className="modal__form-input-select"
              placeholder="University"
            >
              <option value="uni1">University 1</option>
              <option value="uni2">University 2</option>
            </select>
          </div>
        </div>

        <div className="modal__form-input">
          <select className="modal__form-input-select" placeholder="Course">
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
          </select>
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <NextBtn>Add Lead</NextBtn>
        </div>
      </form>
    </>
  );
}
