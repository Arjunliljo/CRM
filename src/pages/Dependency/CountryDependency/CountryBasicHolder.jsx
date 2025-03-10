import { useState } from "react";
import Country from "./Country";
import UpdateCountry from "./UpdateCountry";
import CountryNames from "./CountryNames";
import { useSelector } from "react-redux";

export default function CountryBasicHolder() {
  const [newCountry, setNewCountry] = useState({
    name: "",
    description: "",
  });
  const { isCountryEdit } = useSelector((state) => state.creation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCountry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        {isCountryEdit ? (
          <UpdateCountry />
        ) : (
          <Country
            newCountry={newCountry}
            setNewCountry={setNewCountry}
            handleChange={handleChange}
          />
        )}
      </div>
      <div className="dependancies-content">
        <CountryNames setNewCountry={setNewCountry} />
      </div>
    </div>
  );
}
