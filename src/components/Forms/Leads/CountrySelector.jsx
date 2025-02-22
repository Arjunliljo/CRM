function CountrySelector({ countries }) {
  return (
    <select className="modal__form-input-text-select" placeholder="Country">
      {countries.map((country) => (
        <option key={country._id} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

export default CountrySelector;
