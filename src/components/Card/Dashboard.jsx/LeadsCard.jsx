export default function LeadsCard() {
  const leadData = [
    {
      count: 31,
      label: "Unattended Leads",
      color: "green",
    },
    {
      count: 24,
      label: "Interested Leads",
      color: "blue",
    },
    {
      count: 18,
      label: "Documents Pending",
      color: "green",
    },
    {
      count: 65,
      label: "New Opportunities",
      color: "blue",
    },
  ];

  return (
    <div className="dashboard-leads">
      <header>
        <h1>Leads</h1>
        <button className="add-button">+</button>
      </header>
      <div className="lead-items">
        {leadData.map((item, index) => (
          <div key={index} className="lead-item">
            <div className="lead-count">
              <span className="arrow">↗</span>
              <span className="count">{item.count}</span>
            </div>
            <span className={`label ${item.color}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
