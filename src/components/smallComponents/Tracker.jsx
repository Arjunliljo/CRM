function Tracker() {
  const steps = [
    { id: 1, label: 'Verified', completed: true },
    { id: 2, label: 'Application', completed: true },
    { id: 3, label: 'Offer Letter', completed: true },
    { id: 4, label: 'Payment', completed: true },
    { id: 5, label: 'Interview', completed: true },
    { id: 6, label: 'CAS/VFS', completed: true },
    { id: 7, label: 'Visa', completed: true }
  ];

  return (
    <div className="progress-tracker">
      <div className="progress-tracker__background" />
      
      <div className="progress-tracker__container">
        <div className="progress-tracker__line-container">
          <div className="progress-tracker__line" />
          <div className="progress-tracker__line progress-tracker__line--filled" />

          <div className="progress-tracker__steps">
            {steps.map((step) => (
              <div key={step.id} className="progress-tracker__step">
                <div className={`progress-tracker__dot ${
                  step.completed ? 'progress-tracker__dot--completed' : ''
                }`} />
                <span className="progress-tracker__label">{step.label}</span>
              </div>
            ))}
          </div>

          <div className="progress-tracker__university">
            <span className="progress-tracker__university-name">
              University of Berlin, Germany
            </span>
            <button className="progress-tracker__university-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <button className="progress-tracker__all-apps">
            All applications
          </button>
        </div>
      </div>
    </div>
  );
};;
}

export default Tracker;
