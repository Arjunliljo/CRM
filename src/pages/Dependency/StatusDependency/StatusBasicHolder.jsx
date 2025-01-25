import React, { useState } from "react";
import { useSelector } from "react-redux";
import StatusNames from "./StatusNames";
import AddStatusForm from "./AddStatus/AddStatusForm";
import UpdateStatusForm from "./UpdateStatus/UpdateStatusForm";

export default function StatusBasicHolder() {
  const [newStatus, setNewStatus] = useState({
    name: "",
    isTab: null,
    selectedClass: "",
    description: "",
    subStatuses: [],
  });
  const { editStatus, isStatusEdit } = useSelector((state) => state.creation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        {isStatusEdit ? (
          <UpdateStatusForm />
        ) : (
          <AddStatusForm
            newStatus={newStatus}
            setNewStatus={setNewStatus}
            handleChange={handleChange}
          />
        )}
      </div>
      <div className="dependancies-content">
        <StatusNames setNewStatus={setNewStatus} />
      </div>
    </div>
  );
}
