function Requirements({requirements = [
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
  { name: "Plus Two", mark: "45%" },
]}) {

  return (
    <div className="entry-requirements">
      <h2>Entry Requirements</h2>
      <div className="requirements-grid">
        {requirements.map((requirement, index) => (
          <div key={index} className="requirement-item">
            <span className="requirement-bullet">●</span> {requirement.name} : {requirement.mark}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requirements;
