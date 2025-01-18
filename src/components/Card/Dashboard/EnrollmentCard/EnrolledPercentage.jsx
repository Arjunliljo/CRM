import React from "react";

export default function EnrolledPercentage() {
  const percentageIncrease = 160;
  return (
    <div className="enrollment-card__status">
      <span className="percentage-badge">+{percentageIncrease}%</span>
      <span className="status-text">Increased from last month</span>
    </div>
  );
}
