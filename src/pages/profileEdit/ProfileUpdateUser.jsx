import ActionButtons from "./ActionButtons";
import ProfileSwitchNav from "./ProfileSwitchNav";

function ProfileUpdateUser() {
  return (
    <div className="profileUpdate-main">
      <ProfileSwitchNav />
      <div className="profile-edit-container">
        <div className="profile-content">
          <div className="content-section">
            <div className="content-section-head">
              <h2>Personal Details</h2>
              <button className="upload-btn">Upload Photo</button>
            </div>

            <div className="content-section-item-box">
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

          <div className="content-section">
            <div className="content-section-head">
              <h2>Roles</h2>
            </div>
            <div className="content-section-item-box">
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

              <div className="auto-assign">
                <span className="span-assign">Auto Assign</span>
                <button className="button-off">off</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActionButtons />
    </div>
  );
}

export default ProfileUpdateUser;
