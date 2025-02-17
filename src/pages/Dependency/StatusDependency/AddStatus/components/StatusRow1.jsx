import { classes } from "../../../../../../api/serverdata/serverdatas";

export default function StatusRow1({ newStatus, setNewStatus }) {
  const handleTabSelection = (value) => {
    setNewStatus((prev) => ({
      ...prev,
      isTab: value,
    }));
  };
  const handleCountrySelection = (value) => {
    setNewStatus((prev) => ({
      ...prev,
      isCountryBased: value,
    }));
  };
  const handleApplicationSelection = (value) => {
    setNewStatus((prev) => ({
      ...prev,
      isApplication: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setNewStatus((prev) => ({
      ...prev,
      name: value,
    }));
  };
  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setNewStatus((prev) => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <div className="dependancies-status-box">
      <div className="status-form-group">
        <input
          type="text"
          placeholder="Status name"
          className="input-formGroup"
          value={newStatus.name}
          name="status"
          onChange={handleStatusChange}
        />
      </div>

      <div className="status-form-group">
        <div>
          <p>Is Tab?</p>
          <div className="tab-buttons">
            <button
              type="button"
              className={newStatus.isTab === true ? "active" : ""}
              onClick={() => handleTabSelection(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={newStatus.isTab === false ? "active" : ""}
              onClick={() => handleTabSelection(false)}
            >
              No
            </button>
          </div>
        </div>
        <div>
          <p>Is Country?</p>
          <div className="tab-buttons">
            <button
              type="button"
              className={newStatus.isCountryBased === true ? "active" : ""}
              onClick={() => handleCountrySelection(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={newStatus.isCountryBased === false ? "active" : ""}
              onClick={() => handleCountrySelection(false)}
            >
              No
            </button>
          </div>
        </div>
        <div>
          <p>Is Application?</p>
          <div className="tab-buttons">
            <button
              type="button"
              className={newStatus.isApplication === true ? "active" : ""}
              onClick={() => handleApplicationSelection(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={newStatus.isApplication === false ? "active" : ""}
              onClick={() => handleApplicationSelection(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="status-form-group">
        {/* <p>Select 1 class</p>
        <div className="class-select">
          {classes.map((cls) => (
            <button
              type="button"
              key={cls}
              className={newStatus.selectedClass === cls ? "selected" : ""}
              onClick={() => handleClassSelection(cls)}
            >
              {cls}
            </button>
          ))}
        </div> */}
      </div>

      <div className="status-form-group">
        <textarea
          placeholder="Description"
          name="description"
          value={newStatus.description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
}
