import React, { useState } from "react";
import StatusRow1 from "./AddStatus/StatusRow1";
import StatusRow2 from "./AddStatus/StatusRow2";
import { useSelector } from "react-redux";
import UpdateStatusRow1 from "./UpdateStatus/UpdateStatusRow1";
import UpdateStatusRow2 from "./UpdateStatus/UpdateStatusRow2";
import StatusNames from "./StatusNames";

export default function StatusBasicHolder() {
  const [newBranch, setNewBranch] = useState({
    name: "",
    description: "",
  });
  const { editBranch, isBranchEdit } = useSelector((state) => state.creation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    // <div className="profile-edit-container">
    //   <div className="profile-content">
    //     <StatusRow1 />
    //     <StatusRow2 />
    //   </div>
    // </div>
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        {isBranchEdit ? (
          <div className="dependancies-content-row">
            <UpdateStatusRow1 />
            <UpdateStatusRow2 />
          </div>
        ) : (
          <div className="dependancies-content-row">
            <StatusRow1 />
            <StatusRow2 />
          </div>
        )}
      </div>
      <div className="dependancies-content">
        <StatusNames setNewBranch={setNewBranch} />
      </div>
    </div>
  );
}
