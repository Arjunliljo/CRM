import EnrolledPercentage from "./EnrolledPercentage";
import ProgressBar from "./ProgressBar";
import ChartItem from "./ChartItem";
import BarProgress from "./BarProgress";

export default function EnrollmentCard() {
  // Generate last 6 months of data statically
  const generateMonthlyData = () => {
    const months = [];
    const today = new Date();

    // Define static values for the months
    const fixedValues = [15, 100, 28, 80, 10, 3];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = date.toLocaleString("en-US", { month: "short" });

      months.push({
        month: month,
        value: fixedValues[5 - i],
        percentage: 0, // Static data, can be adjusted as needed
      });
    }
    return months;
  };

  const monthlyData = generateMonthlyData();

  const enrolled = 39;
  const target = 50;
  const difference = target - enrolled;

  return (
    <div className="enrollment-card">
      <h2 className="title">Enrolled</h2>

      <div className="enrollment-card__chart">
        <div className="monthly-chart">
          {monthlyData.map((data, index) => (
            <ChartItem key={index} data={data} />
          ))}
        </div>

        <EnrolledPercentage />

        <div className="enrollment-card__progress">
          <BarProgress />
          <ProgressBar />
          <div className="performance__applications">
            <span>{target}</span>
            Applications so far
          </div>
        </div>
      </div>
    </div>
  );
}
