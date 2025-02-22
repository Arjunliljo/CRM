// import { useApi } from "../../../context/apiContext/ApiContext";

function CountrySelector() {
  // const { countryConfigs } = useApi();
  // console.log(countryConfigs);
  return (
    <select className="modal__form-input-text-select" defaultValue="">
      <option value="" disabled>
        Select Country
      </option>
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
      <option value="china">China</option>
      <option value="france">France</option>
      <option value="germany">Germany</option>
      <option value="india">India</option>
      <option value="japan">Japan</option>
      <option value="uk">United Kingdom</option>
      <option value="usa">USA</option>
    </select>
  );
}

export default CountrySelector;
