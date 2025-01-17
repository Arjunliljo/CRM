export default function ProfileInfo() {
  return (
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
        <div className="form-group">
          <input className="select-formGroup" placeholder="Login ID" />
        </div>

        <div className="auto-assign">
          <span className="span-assign">Auto Assign</span>
          <button className="button-off">off</button>
        </div>
      </div>
    </div>
  );
}
