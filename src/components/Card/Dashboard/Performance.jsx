import PerphomenceBar from "./PerpormanceCard/PerphomenceBar";

export default function Performance() {
  const applications = 128;
  const increase = "+65%";

  // Calculate the end point of the arc based on percentage

  return (
    <div className="performance">
      <h2 className="title">Performance</h2>

      <PerphomenceBar />

      <div className="performance__stats">
        <div className="performance__increase">
          <span className="performance__increase-value">{increase}</span>
          <span className="performance__increase-label">
            Leads you have attended last week
          </span>
        </div>
        <div className="performance__applications">
          <span>{applications} </span>
          Applications so far
        </div>
      </div>
    </div>
  );
}
