import { classes } from "../../../../../../api/serverdata/serverdatas";

export default function UpdateStatusRow1({
  formData,
  setFormData,
  handleChange,
}) {
  const handleTabSelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      isTab: value,
    }));
  };

  const handleClassSelection = (cls) => {
    setFormData((prev) => ({
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
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
      </div>

      <div className="status-form-group">
        <p>Is Tab?</p>
        <div className="tab-buttons">
          <button
            type="button"
            className={formData.isTab === true ? "active" : ""}
            onClick={() => handleTabSelection(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={formData.isTab === false ? "active" : ""}
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
              className={formData.selectedClass === cls ? "selected" : ""}
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
          value={formData.description}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
