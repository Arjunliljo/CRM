import { useState } from "react";
import Branch from "./Branch";
import BranchNames from "./BranchNames";
import { useSelector } from "react-redux";
import UpdateBranch from "./UpdateBranch";

export default function BranchBasicHolder() {
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
          <UpdateBranch />
        ) : (
          <Branch
            newBranch={newBranch}
            setNewBranch={setNewBranch}
            handleChange={handleChange}
          />
        )}
      </div>
      <div className="dependancies-content">
        <BranchNames setNewBranch={setNewBranch} />
      </div>
    </div>
  );
}
