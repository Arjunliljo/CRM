import React from "react";

export default function AutoBtn({ style, onClick }) {
  return (
    <button style={style} onClick={onClick} className="btn btn-auto">
      <span> Auto Assign</span>
      <span></span>
    </button>
  );
}
