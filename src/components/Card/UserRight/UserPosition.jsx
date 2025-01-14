import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { MdOutlineInterests } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import EligibleBttn from "../../buttons/EligibleBttn";

function UserPosition() {
  return (
    <div className="profileCard-box personal-status">
      <div className="personal-details-heading">
        <span className="name-small">Status</span>
      </div>
      <form className="personal-status-elements">
        <span className="personal-status-html-for">Current status</span>
        <div className="select-container">
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interkkkkested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <span className="personal-status-html-for">Next Followup</span>
        <div className="select-container">
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <span className="personal-status-html-for">Permissions</span>
        <div className="select-container">
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <div className="select-container">
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default UserPosition;
