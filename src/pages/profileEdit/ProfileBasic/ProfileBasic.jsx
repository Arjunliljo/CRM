import React from "react";

export default function ProfileBasic() {
  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2 className="small-heading">Personal Details</h2>
        <button className="upload-btn">Upload Photo</button>
      </div>

      <div className="content-section-item-box">
        <div className="form-group">
          <input type="text" placeholder="Name" className="forms-input" />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Contact Number"
            className="forms-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Employee ID"
            className="forms-input"
          />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" className="forms-input" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Address" className="forms-input" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Address" className="forms-input" />
        </div>
      </div>
    </div>
  );
}
