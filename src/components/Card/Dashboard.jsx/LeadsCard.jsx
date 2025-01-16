import HomeIcon from "../../utils/Icons/HomeIcon";

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
        <button className="add-button">
          <HomeIcon
            path="plus"
            color="#000000f8"
            style={{ transform: "rotate(270deg)" }}
          />
        </button>
      </header>
      <div className="lead-items">
        {leadData.map((item, index) => (
          <div key={index} className="lead-item">
            <div className="lead-count">
              <span className="arrow">
                <HomeIcon
                  path="up-arrow"
                  color="#fffffff9"
                  style={{ transform: "rotate(270deg)" }}
                />
              </span>
              <span className="count">{item.count}</span>
            </div>
            <span className={`label ${item.color}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
