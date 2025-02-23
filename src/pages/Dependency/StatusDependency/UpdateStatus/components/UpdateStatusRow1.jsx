import { classes } from "../../../../../../api/serverdata/serverdatas";
import Popover from "react-popover";
import { useState } from "react";
import PopoverContent from "../../AddStatus/components/PopoverContent";

export default function UpdateStatusRow1({
  formData,
  setFormData,
  handleChange,
}) {
  const [selectedCountry, setSelectedCountry] = useState(formData.countries);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // clg;

  const handleTabSelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      isTab: value,
    }));
  };
  const handleCountrySelect = () => {
    setNewStatus((prev) => ({
      ...prev,
      countries: selectedCountry,
    }));
    setIsPopoverOpen(false);
  };

  const handleCountrySelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      isCountryBased: value,
      countries: selectedCountry,
    }));
    if (value) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
      setSelectedCountry([]);
    }
  };

  const handleApplicationSelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      isApplication: value,
    }));
  };

  const popoverContent = (
    <PopoverContent
      selectedCountry={selectedCountry}
      setSelectedCountry={setSelectedCountry}
      onSelect={handleCountrySelect}
      onCancel={() => {
        setIsPopoverOpen(false);
        setSelectedCountry([]);
      }}
      formData={formData}
    />
  );

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
        <div>
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
        <div>
          <p>
            Is Country?<span>(UK)</span>
          </p>

          <div className="tab-buttons">
            <Popover
              isOpen={isPopoverOpen}
              body={popoverContent}
              place="below"
              onOuterAction={() => setIsPopoverOpen(false)}
              tipSize={0}
              enterExitTransitionDurationMs={0}
              className="custom-popover"
              preferPlace="below"
              style={{
                transition: "none",
                transform: "none",
                animation: "none",
              }}
            >
              <button
                type="button"
                className={formData.isCountryBased === true ? "active" : ""}
                onClick={() => handleCountrySelection(true)}
              >
                Yes
              </button>
            </Popover>
            <button
              type="button"
              className={formData.isCountryBased === false ? "active" : ""}
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
              className={formData.isApplication === true ? "active" : ""}
              onClick={() => handleApplicationSelection(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={formData.isApplication === false ? "active" : ""}
              onClick={() => handleApplicationSelection(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
      {/* <div className="status-form-group">
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
      </div> */}
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
