import { useState } from "react";
import Popover from "react-popover";

export default function StatusRow1({ newStatus, setNewStatus }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Costa Rica",
    "Croatia",
    "Cuba",

    "Madagascar",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Morocco",
    "Myanmar",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Nigeria",
    "North Korea",
  ];

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
    if (value) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
      setSelectedCountry("");
    }
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

  const handleCountrySelect = () => {
    setNewStatus((prev) => ({
      ...prev,
      country: selectedCountry,
    }));
    setIsPopoverOpen(false);
  };

  const popoverContent = (
    <div className="popover-content" style={{ zIndex: 1000 }}>
      <h3>Select Country</h3>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        style={{ zIndex: 1001 }}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <div className="popover-buttons">
        <button
          onClick={handleCountrySelect}
          disabled={!selectedCountry}
          className="select-btn"
        >
          Select
        </button>
        <button
          onClick={() => {
            setIsPopoverOpen(false);
            setSelectedCountry("");
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );

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
                className={newStatus.isCountryBased === true ? "active" : ""}
                onClick={() => handleCountrySelection(true)}
              >
                Yes
              </button>
            </Popover>
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
