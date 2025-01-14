import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { MdOutlineInterests } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import EligibleBttn from "../../buttons/EligibleBttn";
import PrimaryBttn from "../../buttons/PrimaryBttn";

function UserPosition() {
  return (
    <div className="profileCardEdituser-box personalUserEdit-status">
      <div className="personalUserEdit-details-heading">
        <span className="name-small">Position</span>
      </div>
      <form className="personalUserEdit-status-elements">
        <span className="personalUserEdit-status-html-for">Branch</span>
        <div className="select-container">
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <span className="personalUserEdit-status-html-for">Role</span>
        <div className="select-container">
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <span className="personalUserEdit-status-html-for">Permissions</span>
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
        <div className="personalUserEdit-details-buttons">
          <PrimaryBttn
            style={{
              backgroundColor: "#dadada",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Cancel
          </PrimaryBttn>
          <PrimaryBttn
            style={{
              paddingLeft: "2rem",
              paddingRight: "2rem",
              fontWeight: "bold",
            }}
          >
            Submit
          </PrimaryBttn>
        </div>
      </form>
    </div>
  );
}

export default UserPosition;
