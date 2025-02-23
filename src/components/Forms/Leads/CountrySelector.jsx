function CountrySelector({countries, handleChange}) {
  return (
    <select className="modal__form-input-text-select" placeholder="Country"  name="country" onChange={handleChange}>
      {countries?.map((country) => (
        <option key={country._id} value={country._id}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

export default CountrySelector;
