import { useApi } from "../../../context/apiContext/ApiContext";
import RoleItem from "./RoleItem";

export default function RoleNames({ setNewBranch }) {
  const { branchConfigs } = useApi();

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {branchConfigs?.branches?.map((val, i) => (
            <RoleItem key={i} item={val} setNewBranch={setNewBranch} />
          ))}
        </div>
      </div>
    </div>
  );
}
