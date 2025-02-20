import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineInterests } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import EligibleBttn from "../../buttons/EligibleBttn";
import { getStatusName } from "../../../service/nameFinders";
import { useEffect, useState } from "react";

export default function ProfileCardStatus({ statuses, lead ,countries }) {
  const statusName = getStatusName(lead?.status, statuses);

  const [status, setStatus] = useState(statusName);

  useEffect(() => {
    setStatus(statusName);
  }, [statusName]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="profileCard-box personal-status" >
      <div className="personal-details-heading">
        <span className="name-small">Status</span>
        <div className="icons personal-details-group-icons">
          <span className="arrow-btn">
            <IoMdArrowBack className="arrow-btn-element" />
          </span>
          <span className="arrow-btn">
            <IoMdArrowForward className="arrow-btn-element" />
          </span>
        </div>
      </div>
      <form className="personal-status-elements">
        <span className="personal-status-html-for">Current status</span>
        <div className="select-container">
          <MdOutlineInterests className="select-icon" />
          <select
            className="selector-with-icon"
            value={status}
            id=""
            onChange={handleStatusChange}
          >
            {statuses?.map((status) => (
              <option value={status.name} key={status._id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        <span className="personal-status-html-for">Next Followup</span>
        <div className="select-container">
          <MdDateRange className="select-icon" />
          <select className="selector-with-icon" name="Interested" id="">
            <option value="Interested">Interested</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <span className="personal-status-html-for">Country</span>
        <div className="select-container">
          <MdOutlineInterests className="select-icon" />
          <select
            className="selector-with-icon"
            value={status}
            id=""
            onChange={handleStatusChange}
          >
            {countries?.map((country) => (
              <option value={country.name} key={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-body-mid">
          <textarea
            type="text"
            placeholder="Remark"
            style={{ height: "16rem" }}
            onClick={(e) => e.preventDefault()}
          />
        </div>
        <div className="personal-status-bottom-set">
          {/* <div className="personal-details-heading ">
            <span className="personal-status-html-for">Updated by</span>
            <div className="icons personal-details-group-icons">
              <span className="arrow-btn">
                <IoMdArrowBack className="arrow-btn-element" />
              </span>
              <span className="arrow-btn">
                <IoMdArrowForward className="arrow-btn-element" />
              </span>
            </div>
          </div> */}
          {/* <input type="text" className="selector-with-icon" /> */}

        </div>
        <div className="eligible-head">
          <EligibleBttn>Eligible Course</EligibleBttn>
        </div>
      </form>
    </div>
  );
}
