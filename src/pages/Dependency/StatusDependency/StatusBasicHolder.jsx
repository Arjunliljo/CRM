import React from "react";
import StatusRow1 from "./StatusRow1";
import StatusRow2 from "./StatusRow2";

export default function StatusBasicHolder() {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <StatusRow1 />
        <StatusRow2 />
      </div>
    </div>
  );
}
