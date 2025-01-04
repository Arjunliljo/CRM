import React, { useState } from "react";

export default function AutoBtn({ style, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <button
      style={style}
      onClick={handleClick}
      className={`btn btn-auto ${isActive ? "btn-auto-on" : ""}`}
    >
      <span style={{ marginLeft: "1rem" }}>Auto Assign</span>
      <span className="btn-auto-off">{isActive ? "On" : "Off"}</span>
    </button>
  );
}
