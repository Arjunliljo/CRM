import { useDispatch } from "react-redux";
import { useApi } from "../../../context/apiContext/ApiContext";
import SmallLoader from "../../../features/SmallLoader";

export default function CountrySelector({ setter }) {
  const dispatch = useDispatch();
  const {
    countryConfigs: { countries },
  } = useApi();

  if (!countries) return <SmallLoader />;

  const handleChange = (event) => {
    const selectedCountry = countries.find(
      (country) => country._id === event.target.value
    );
    if (selectedCountry) {
      dispatch(setter({ id: selectedCountry._id, name: selectedCountry.name }));
    }
  };

  return (
    <div className="form-group">
      <select className="forms-select" onChange={handleChange}>
        {countries?.map((country, i) => (
          <option key={i} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}
