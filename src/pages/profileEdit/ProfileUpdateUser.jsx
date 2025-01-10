function ProfileUpdateUser() {
  return (
    <div className="profileUpdate-main">
      <div className="profile-edit-container">
        <div className="profile-nav">
          <button className="nav-item active">Profile</button>
          <button className="nav-item">Status</button>
          <button className="nav-item">Dashboard</button>
        </div>

        <div className="profile-content">
          <div className="content-section">
            <h2>Personal Details</h2>
            <button className="upload-btn">Upload Photo</button>

            <div className="form-left">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  className="input-formGroup"
                />
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
                <input
                  type="email"
                  placeholder="Email"
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
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Address"
                  className="input-formGroup"
                />
              </div>
            </div>
          </div>

          <div className="form-right">
            <h2>Roles</h2>
            <div className="form-group">
              <select className="select-formGroup">
                <option value="" disabled selected>
                  Role
                </option>
              </select>
            </div>
            <div className="form-group">
              <select className="select-formGroup">
                <option value="" disabled selected>
                  Branch
                </option>
              </select>
            </div>
            <div className="form-group">
              <select className="select-formGroup">
                <option value="" disabled selected>
                  Country
                </option>
              </select>
            </div>
            <div className="form-group auto-assign">
              <span className="span-assign">Auto Assign</span>
              <button className="button-off">off</button>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-next">Next</button>
      </div>
    </div>
  );
}

export default ProfileUpdateUser;
