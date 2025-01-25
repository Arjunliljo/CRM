import { useApi } from "../../../context/apiContext/ApiContext";
import CountryItem from "./CountryItem";

export default function CountryNames({ setNewCountry }) {
  const {
    countryConfigs: { isLoading, countries },
  } = useApi();

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {isLoading ? (
            <div className="btn-bigloader"></div>
          ) : (
            countries?.map((val, i) => (
              <CountryItem key={i} item={val} setNewCountry={setNewCountry} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
