import React from "react";

export default function CIrclePlus({ children, onClick, style }) {
  return (
    <button className="btn circle-btn" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
