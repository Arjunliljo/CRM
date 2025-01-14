const Tracker = () => {
  const steps = [
    "Verified",
    "Application",
    "Offer Letter",
    "Payment",
    "Interview",
    "CAS/VFS",
    "Visa",
  ];

  return (
    <div className="progress-tracker">
      <div className="progress-tracker__steps">
        {steps.map((step, index) => (
          <div key={index} className="progress-tracker__step">
            <span className="progress-tracker__indicator"></span>
            <span className="progress-tracker__label">{step}</span>
          </div>
        ))}
      </div>
      <div className="progress-tracker__footer">
        <div className="progress-tracker__university">
          University of Berlin, Germany
        </div>
        <button className="progress-tracker__all-applications">
          All applications
        </button>
      </div>
    </div>
  );
};

export default Tracker;
