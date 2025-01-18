import React from "react";

export default function ProgressBar() {
  const enrolled = 39;
  const target = 50;

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${(enrolled / target) * 100}%` }}
      />
      <div className="progress-bar__start-cap" style={{ left: `0%` }} />
      <div
        className="progress-bar__end-cap"
        style={{ left: `${(enrolled / target) * 100}%` }}
      />
      <div className="progress-remaining" />
    </div>
  );
}
