import React from "react";
import { useApi } from "../../../../../context/apiContext/ApiContext";
// import { refetchStatuses } from "../../../../../apiHooks/useStatuses";

export default function PopoverContent({
  selectedCountry,
  setSelectedCountry,
  onSelect,
  onCancel,
  formData,
  contents,
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
      console.log(prev, "prev");
      const isSelected = prev.some((c) => c._id === country._id);
      if (isSelected) {
        return prev.filter((c) => c._id !== country._id);
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
        {Array.isArray(contents) && contents.length > 0 ? (
          contents.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCountryClick({ _id: item.id, name: item.name })}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: selectedCountry.some((c) => c._id === item.id)
                  ? "#e0e0e0"
                  : "transparent",
                borderBottom: "1px solid #eee",
              }}
            >
                {item.name}
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
