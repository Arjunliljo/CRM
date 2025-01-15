export default function Performance() {
  const percentage = 79;
  const total = 799;
  const applications = 128;
  const increase = "+65%";

  // Calculate the end point of the arc based on percentage
  const radius = 80;
  const circumference = Math.PI * radius;
  const progressOffset = ((100 - percentage) / 100) * circumference;

  return (
    <div className="performance">
      <h2 className="performance__title">Performance</h2>

      <div className="performance__gauge">
        <svg viewBox="0 0 200 120" className="performance__gauge-svg">
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dde1ee" />
              <stop offset="100%" stopColor="#4070ff" />
            </linearGradient>
            {/* Define the stripe pattern */}
            <pattern id="stripe-pattern" patternUnits="userSpaceOnUse" width="2" height="2" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="2" stroke="#4070ff" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Main arc with stripes */}
          <path
            d="M20 100 A80 80 0 1 1 180 100"
            className="performance__gauge-background"
            stroke="url(#stripe-pattern)"
          />
          {/* Progress arc (blue gradient) */}
          <path
            d="M20 100 A80 80 0 1 1 180 100"
            className="performance__gauge-progress"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progressOffset
            }}
          />
        </svg>
        <div className="performance__gauge-value">{percentage}</div>
        <span className="performance__gauge-total">{total}</span>
      </div>

      <div className="performance__stats">
        <div className="performance__increase">
          <span className="performance__increase-value">{increase}</span>
          <span className="performance__increase-label">Leads you have attended last week</span>
        </div>
        <div className="performance__applications">
          <span className="performance__applications-value">{applications}</span>
          <span className="performance__applications-label">Applications so far</span>
        </div>
      </div>
    </div>
  );
}