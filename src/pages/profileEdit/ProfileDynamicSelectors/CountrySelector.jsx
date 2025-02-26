import { useEffect, useState } from "react";
import { useApi } from "../../../context/apiContext/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { setProfileCountries } from "../../../../global/profileSlice";
import { BsExclamation } from "react-icons/bs";

export default function CountrySelector({ isCreate }) {
  const {
    countryConfigs: { countries },
  } = useApi();

  // const countries = [];

  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [selectedCountry, setSelectedCountry] = useState(profileData.countries);

  const handleCountryClick = (country) => {
    setSelectedCountry((prev) => {
      const updatedCountries = prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country];
      dispatch(setProfileCountries(updatedCountries));
      return updatedCountries;
    });
  };

  return (
    <div className="dynamic-selector">
      <h2
        className="small-heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        Country{" "}
        {isCreate && !selectedCountry?.length && (
          <BsExclamation className="error-icon" style={{ fontSize: "20px" }} />
        )}
      </h2>
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
