import icon from "./../assets/Icons/mlq-01pro.svg";
import { CiBellOn } from "react-icons/ci";
import profile from "./../assets/profilepic.avif";
function Mainhead() {
  return (
    <div className="logocontainer">
      <img src={icon} alt="" className="logocontainer-rightlogo" />
      <div className="logocontainer-leftlead">
        <h2>Leads</h2>
        <div className="logocontainer-leftlead-bell">
          <CiBellOn />
        </div>
        <img src={profile} alt="" className="logocontainer-leftlead-photo" />
      </div>
    </div>
  );
}

export default Mainhead;
