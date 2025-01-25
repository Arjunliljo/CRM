import { useState } from "react";
import Country from "./Country";
import UpdateCountry from "./UpdateCountry";
import CountryNames from "./CountryNames";
import { useSelector } from "react-redux";

export default function CountryBasicHolder() {
  const [newBranch, setNewBranch] = useState({
    name: "",
    description: "",
  });
  const { editBranch, isBranchEdit } = useSelector((state) => state.creation);
  const [newCountry, setNewCountry] = useState({
    name: "",
    description: "",
  });
  const { editRole, isCountryEdit } = useSelector((state) => state.creation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        {isBranchEdit ? (
          <UpdateCountry />
        ) : (
          <Country
            newBranch={newBranch}
            setNewBranch={setNewBranch}
            handleChange={handleChange}
          />
        )}
      </div>
      <div className="dependancies-content">
        <CountryNames setNewBranch={setNewBranch} />
      </div>
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
