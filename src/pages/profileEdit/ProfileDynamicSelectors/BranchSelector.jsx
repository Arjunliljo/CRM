import { useEffect, useState } from "react";
import { useApi } from "../../../context/apiContext/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { setProfileBranches } from "../../../../global/profileSlice";
import { BsExclamation } from "react-icons/bs";

export default function BranchSelector({ isCreate }) {
  const {
    branchConfigs: { branches },
  } = useApi();

  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [selectedBranch, setSelectedBranch] = useState(profileData.branches);

  const handleBranchClick = (branch) => {
    setSelectedBranch((prev) => {
      const updatedBranches = prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch];
      dispatch(setProfileBranches(updatedBranches));
      return updatedBranches;
    });
  };

  return (
    <div className="dynamic-selector">
      <h2
        className="small-heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        Branch{" "}
        {isCreate && !selectedBranch?.length && (
          <BsExclamation className="error-icon" style={{ fontSize: "20px" }} />
        )}
      </h2>

      <div className="dynamic-selector-list">
        {branches?.length > 0 ? (
          branches.map((branch, i) => (
            <span
              className={`dynamic-selector-list-item ${
                selectedBranch.includes(branch) ? "active" : ""
              }`}
              key={i}
              onClick={() => handleBranchClick(branch)}
            >
              {branch.name}
            </span>
          ))
        ) : (
          <div className="No-data">No branches available</div>
        )}
      </div>
    </div>
  );
}
