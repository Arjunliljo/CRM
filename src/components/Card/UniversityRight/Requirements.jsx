function Requirements() {
  const requirements = [
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
    "Plus Two : 45%",
  ];
  return (
    <div className="entry-requirements">
      <h2>Entry Requirements</h2>
      <div className="requirements-grid">
        {requirements.map((requirement, index) => (
          <div key={index} className="requirement-item">
            <span className="requirement-bullet">●</span> {requirement}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requirements;
