import React from "react";
import { useApi } from "../../../../../context/apiContext/ApiContext";
// import { refetchStatuses } from "../../../../../apiHooks/useStatuses";

export default function PopoverContent({
  selectedCountry,
  setSelectedCountry,
  onSelect,
  onCancel,
  formData,
}) {
  const { countryConfigs } = useApi();

  // Set default selected countries from formData when component mounts
  React.useEffect(() => {
    if (formData?.countries?.length > 0) {
      setSelectedCountry(formData.countries);
    }
  }, [formData]); // Added formData to dependency array

  const handleCountryClick = (country) => {
    setSelectedCountry((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c !== country);
      }
      return [...prev, country];
    });
  };
  // refetchStatuses()
  return (
    <div className="popover-content" style={{ zIndex: 1000 }}>
      <h3>Select Countries</h3>
      <div
        style={{
          zIndex: 1001,
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        {Array.isArray(countryConfigs.countries) &&
        countryConfigs.countries.length > 0 ? (
          countryConfigs.countries.map((country) => (
            <div
              key={country._id}
              onClick={() => handleCountryClick(country._id)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: selectedCountry.includes(country._id)
                  ? "#e0e0e0"
                  : "transparent",
                borderBottom: "1px solid #eee",
              }}
            >
              {country.name}
            </div>
          ))
        ) : (
          <div style={{ padding: "10px", textAlign: "center" }}>
            No countries available
          </div>
        )}
      </div>
      <div className="popover-buttons">
        <button
          onClick={onSelect}
          disabled={!selectedCountry.length}
          className="select-btn"
        >
          Select
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
