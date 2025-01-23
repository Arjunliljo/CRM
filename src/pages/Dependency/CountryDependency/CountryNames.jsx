import { useApi } from "../../../context/apiContext/ApiContext";
import CountryItem from "./CountryItem";

export default function CountryNames({ setNewBranch }) {
  const { branchConfigs } = useApi();

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {branchConfigs?.branches?.map((val, i) => (
            <CountryItem key={i} item={val} setNewBranch={setNewBranch} />
          ))}
        </div>
      </div>
    </div>
  );
}
