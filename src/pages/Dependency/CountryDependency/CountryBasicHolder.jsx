import BranchNames from "../BranchDependency/BranchNames";
import Country from "./Country";

export default function CountryBasicHolder() {
  return (
    <div className="profile-edit-container dependancies-holder">
      <div className="dependancies-content">
        <Country />
      </div>
      <div className="dependancies-content">
        <BranchNames />
      </div>
    </div>
  );
}
