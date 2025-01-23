import { useApi } from "../../../context/apiContext/ApiContext";
import CountryItem from "./CountryItem";

export default function CountryNames({ setNewBranch }) {
  const { countryConfigs } = useApi();

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {countryConfigs?.countries?.map((val, i) => (
            <CountryItem key={i} item={val} setNewBranch={setNewBranch} />
          ))}
        </div>
      </div>
    </div>
  );
}
