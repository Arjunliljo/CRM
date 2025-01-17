import React from "react";

export default function ProfileBasic() {
  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2>Personal Details</h2>
        <button className="upload-btn">Upload Photo</button>
      </div>

      <div className="content-section-item-box">
        <div className="form-group">
          <input type="text" placeholder="Name" className="input-formGroup" />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Contact Number"
            className="input-formGroup"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Employee ID"
            className="input-formGroup"
          />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" className="input-formGroup" />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address"
            className="input-formGroup"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address"
            className="input-formGroup"
          />
        </div>
      </div>
    </div>
  );
}
