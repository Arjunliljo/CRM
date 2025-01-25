import { useState } from "react";
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
  const { isStatusEdit } = useSelector((state) => state.creation);

  return (
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        {isStatusEdit ? (
          <UpdateStatusForm />
        ) : (
          <AddStatusForm newStatus={newStatus} setNewStatus={setNewStatus} />
        )}
      </div>
      <div className="dependancies-content">
        <StatusNames setNewStatus={setNewStatus} />
      </div>
    </div>
  );
}
