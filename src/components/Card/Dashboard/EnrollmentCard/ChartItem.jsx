import React from "react";

export default function ChartItem({ data, index }) {
  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });
  return (
    <div className="chart-column" key={index}>
      <div className="bar-wrapper">
        <div
          className={`bar ${data.month === currentMonth ? "bar--active" : ""}`}
          style={{ height: `${Math.abs(data.value)}px` }}
        >
          {data.month === currentMonth && <span className="bar__badge">3</span>}
        </div>
      </div>
      <span className="month-label">{data.month}</span>
    </div>
  );
}
