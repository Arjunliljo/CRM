import { useEffect, useState } from "react";
import { useApi } from "../../../context/apiContext/ApiContext";
import { useDispatch } from "react-redux";
import { setProfileBranches } from "../../../../global/profileSlice";

export default function BranchSelector() {
  const {
    branchConfigs: { branches },
  } = useApi();

  const dispatch = useDispatch();

  const [selectedBranch, setSelectedBranch] = useState([]);

  const handleBranchClick = (branch) => {
    setSelectedBranch((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  useEffect(() => {
    dispatch(setProfileBranches(selectedBranch));
  }, [selectedBranch, dispatch]);

  return (
    <div className="dynamic-selector">
      <h2 className="small-heading">Branch</h2>
      <div className="dynamic-selector-list">
        {branches?.map((branch, i) => (
          <span
            className={`dynamic-selector-list-item ${
              selectedBranch.includes(branch) ? "active" : ""
            }`}
            key={i}
            onClick={() => handleBranchClick(branch)}
          >
            {branch.name}
          </span>
        ))}
      </div>
    </div>
  );
}
