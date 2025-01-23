import { useState } from "react";

const Tracker = ({ completedStep }) => {
  const steps = [
    { id: 1, label: "Verified" },
    { id: 2, label: "Application" },
    { id: 3, label: "Offer Letter" },
    { id: 4, label: "Payment" },
    { id: 5, label: "Interview" },
  ];
  const completedWidth = (completedStep / steps.length) * 100;

  const [numSections, setNumSections] = useState(1); // Counter for sections

  const handleAddSection = () => {
    setNumSections(numSections + 1); // Increment the counter
  };

  return (
    <div className="progress-tracker">
      <div className="progress-tracker__container">
        {[...Array(numSections)].map((_, index) => (
          <div key={index} className="progress-tracker__section">
            <div
              className="progress-tracker__steps"
              style={{
                "--completed-width": `${completedWidth}%`,
              }}
            >
              {steps.map((step) => (
                <div key={step.id} className="progress-tracker__step">
                  <div
                    className={`progress-tracker__dot ${
                      completedStep >= step.id
                        ? "progress-tracker__dot--completed"
                        : ""
                    }`}
                  />
                  <span className="progress-tracker__label">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="progress-tracker__bottom">
          <div className="progress-tracker__university">
            <span className="progress-tracker__university-name">
              University of Berlin, Germany
            </span>
          </div>

          <button
            className="progress-tracker__all-apps"
            style={{ textDecoration: "underline" }}
            onClick={handleAddSection} // Add event handler
          >
            All applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
