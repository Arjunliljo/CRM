import React from "react";

export default function SearchBar({ style }) {
  return (
    <div className="search-bar" style={style}>
      <input type="text" placeholder="Search" />
    </div>
  );
}
