import { useEffect, useState } from "react";
import { useApi } from "../../../context/apiContext/ApiContext";
import { useDispatch } from "react-redux";
import { setProfileCountries } from "../../../../global/profileSlice";

export default function CountrySelector() {
  const {
    countryConfigs: { countries },
  } = useApi();

  // const countries = [];

  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState([]);

  const handleCountryClick = (country) => {
    setSelectedCountry((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  useEffect(() => {
    dispatch(setProfileCountries(selectedCountry));
  }, [selectedCountry, dispatch]);

  return (
    <div className="dynamic-selector">
      <h2 className="small-heading">Country</h2>
      <div className="dynamic-selector-list">
        {countries?.length > 0 ? (
          countries.map((country, i) => (
            <span
              className={`dynamic-selector-list-item ${
                selectedCountry.includes(country) ? "active" : ""
              }`}
              key={country.name}
              onClick={() => handleCountryClick(country)}
            >
              {country.name}
            </span>
          ))
        ) : (
          <div className="No-data">No Counties Available</div>
        )}
      </div>
    </div>
  );
}
