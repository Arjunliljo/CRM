import BranchItem from "./BranchItem";
import { useApi } from "../../../context/apiContext/ApiContext";

export default function BranchNames({ setNewBranch }) {
  const { branchConfigs } = useApi();

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {branchConfigs?.branches?.map((val, i) => (
            <BranchItem key={i} item={val} setNewBranch={setNewBranch} />
          ))}
        </div>
      </div>
    </div>
  );
}
