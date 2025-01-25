import { classes } from "../../../../../../api/serverdata/serverdatas";

export default function StatusRow1({ newStatus, setNewStatus, handleChange }) {
  const handleTabSelection = (value) => {
    setNewStatus((prev) => ({
      ...prev,
      isTab: value, // Pass boolean directly
    }));
  };

  const handleClassSelection = (cls) => {
    setNewStatus((prev) => ({
      ...prev,
      selectedClass: cls,
    }));
  };
  return (
    <div className="dependancies-status-box">
      <div className="status-form-group">
        <input
          type="text"
          placeholder="Status name"
          className="input-formGroup"
          value={newStatus.status}
          name="status"
          onChange={handleChange}
        />
      </div>

      <div className="status-form-group">
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

      <div className="status-form-group">
        <p>Select 1 class</p>
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
        </div>
      </div>

      <div className="status-form-group">
        <textarea
          placeholder="Description"
          name="description"
          value={newStatus.description}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
