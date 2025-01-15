export default function EnrollmentCard() {
  // Generate last 6 months of data statically
  const generateMonthlyData = () => {
    const months = [];
    const today = new Date();

    // Define static values for the months
    const fixedValues = [15, 100, 28, 80, 10, 3];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = date.toLocaleString('en-US', { month: 'short' });

      months.push({
        month: month,
        value: fixedValues[5 - i],
        percentage: 0, // Static data, can be adjusted as needed
      });
    }
    return months;
  };

  const monthlyData = generateMonthlyData();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });

  const enrolled = 39;
  const target = 50;
  const difference = target - enrolled;
  const percentageIncrease = 160;

  return (
    <div className="enrollment-card">
      <h2 className="enrollment-card__title">Enrolled</h2>

      <div className="enrollment-card__chart">
        <div className="monthly-chart">
          {monthlyData.map((data, index) => (
            <div className="chart-column" key={index}>
              <div className="bar-wrapper">
                <div
                  className={`bar ${data.month === currentMonth ? 'bar--active' : ''}`}
                  style={{ height: `${Math.abs(data.value)}px` }}
                >
                  {data.month === currentMonth && <span className="bar__badge">3</span>}
                </div>
              </div>
              <span className="month-label">{data.month}</span>
            </div>
          ))}
        </div>
        {/* Percentage Indicator */}
        <div className="enrollment-card__status">
          <span className="percentage-badge">+{percentageIncrease}%</span>
          <span className="status-text">Increased from last month</span>
        </div>

        {/* Progress Bar */}
        <div className="enrollment-card__progress">
          <div className="progress-numbers">
            <div className="enrolled">
              <span className="value">{enrolled}</span>
              <span className="label">Enrolled</span>
            </div>
            <div className="target">
              <span className="value">{target}</span>
              <span className="label">Target</span>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(enrolled / target) * 100}%` }}
            />
            <div
              className="progress-bar__start-cap"
              style={{ left: `0%` }}
            />
            <div
              className="progress-bar__end-cap"
              style={{ left: `${(enrolled / target) * 100}%` }}
            />
            <div className="progress-remaining" />
          </div>

          <div className="target-difference">
            <span>{difference} admissions away from target</span>
          </div>
        </div>
      </div>
    </div>
  );
};
