import { useState } from "react";
import Branch from "./Branch";
import BranchNames from "./BranchNames";

export default function BranchBasicHolder() {
  const [newBranch, setNewBranch] = useState({
    name: "",
    description: "",
  });

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
        <Branch
          newBranch={newBranch}
          setNewBranch={setNewBranch}
          handleChange={handleChange}
        />
      </div>
      <div className="dependancies-content">
        <BranchNames setNewBranch={setNewBranch} />
      </div>
    </div>
  );
}
