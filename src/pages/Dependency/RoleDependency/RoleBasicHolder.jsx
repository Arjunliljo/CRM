import { useState } from "react";
import Role from "./Role";
import { useSelector } from "react-redux";
import UpdateRole from "./UpdateRole";
import RoleNames from "./RoleNames";

export default function RoleBasicHolder() {
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
   <div className="profile-edit-container dependancies-holder">
         <div className="dependancies-content">
           {isBranchEdit ? (
             <UpdateRole />
           ) : (
             <Role
               newBranch={newBranch}
               setNewBranch={setNewBranch}
               handleChange={handleChange}
             />
           )}
         </div>
         <div className="dependancies-content">
           <RoleNames setNewBranch={setNewBranch} />
         </div>
       </div>
  );
}
