import React, { useState } from 'react'
import CancelBtn from '../../buttons/CancelBtn'
import NextBtn from '../../buttons/NextBtn';
import { message } from 'antd';

export default function DeleteUser({closeModal, onClick}) {
const[input, setInput] = useState("")


const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "delete permanently") {
      onClick();
    } else {
      message.error(`Type &quot;delete permanently&quot; to confirm deletion`);
    }
}

  return (
    <form onSubmit={handleSubmit} className="modal__form">

      <div className="modal__form-row">
        <div className="modal__form-input-text">
        <p>Type &quot;delete permanently&quot; to confirm deletion</p>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => setInput(e.target.value)}
            placeholder='"delete permanently"'
            className="input-formGroup"
            required
          />

        </div>
      </div>
      <div className="modal__form-buttons">
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        <NextBtn type="submit" onClick={handleSubmit} style={{backgroundColor: "#bd1212", color: "white"}}>
          Delete
        </NextBtn>
      </div>
    </form>
  )
}
