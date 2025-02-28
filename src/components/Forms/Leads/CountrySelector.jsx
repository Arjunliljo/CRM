import React from 'react';

function CountrySelector({countries, handleChange, defaultValue}) {
  const [selectedCountry, setSelectedCountry] = React.useState(
    countries?.find(country => country._id === defaultValue?._id) || null
  );

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const country = countries.find(country => country._id === selectedId);
    setSelectedCountry(country);
    handleChange(event); // Call the original handleChange function
  };

  return (
    <div>
      <select
        className="modal__form-input-text-select"
        placeholder="Country"
        name="country"
        onChange={handleSelectChange}
        value={selectedCountry ? selectedCountry._id : ''}
      >
        {countries?.map((country) => (
          <option key={country._id} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
