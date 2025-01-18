import React from "react";

export default function BarProgress() {
  const enrolled = 39;
  const target = 50;

  return (
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
    </div>
  );
}
