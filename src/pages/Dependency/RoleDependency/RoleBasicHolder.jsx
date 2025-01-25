import { useState } from "react";
import Role from "./Role";
import { useSelector } from "react-redux";
import UpdateRole from "./UpdateRole";
import RoleNames from "./RoleNames";

export default function RoleBasicHolder() {
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
  });
  const { isRoleEdit } = useSelector((state) => state.creation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        {isRoleEdit ? (
          <UpdateRole />
        ) : (
          <Role
            newRole={newRole}
            setNewRole={setNewRole}
            handleChange={handleChange}
          />
        )}
      </div>
      <div className="dependancies-content">
        <RoleNames setNewRole={setNewRole} />
      </div>
    </div>
  );
}
