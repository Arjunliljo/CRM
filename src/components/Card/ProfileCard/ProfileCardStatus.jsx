import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineInterests } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import EligibleBttn from "../../buttons/EligibleBttn";
import { getStatusName } from "../../../service/nameFinders";
import { useEffect, useState } from "react";
import { useKey } from "../../../hooks/useKey";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProfileCardStatus({ statuses, lead, countries, onsubmit }) {
  const statusName = getStatusName(lead?.status, statuses);
  const [status, setStatus] = useState(statusName);
  const [remark, setRemark] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(lead?.country || countries?.[0]?._id || "");
  const [showPastRemark, setShowPastRemark] = useState(false);
  const [followupDate, setFollowupDate] = useState(new Date());

  useEffect(() => {
    setStatus(statusName);
  }, [statusName]);

  useEffect(() => {
    if (lead?.remark) {
      setRemark(lead.remark);
      setShowPastRemark(false);
    } else if (lead?.pastRemark && lead?.remark === "") {
      setShowPastRemark(true);
    } else {
      setRemark("");
      setShowPastRemark(false);
    }
  }, [lead?.remark, lead?.pastRemark]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
    setShowPastRemark(false);
  };

  useKey("Enter", () => onsubmit(remark, lead?._id));

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
          <DatePicker
            selected={followupDate}
            onChange={(date) => setFollowupDate(date)}
            className="selector-with-icon"
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
          />
        </div>
        <span className="personal-status-html-for">Country</span>
        <div className="select-container">
          <MdOutlineInterests className="select-icon" />
          <select
            className="selector-with-icon"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries?.map((country) => (
              <option value={country._id} key={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-body-mid">
          {showPastRemark && lead?.pastRemark ? (
            <div className="past-remark">
              <p>Previous Remark:</p>
              <p>{lead?.pastRemark}</p>
              <p className="past-remark-info">Managed by: {lead?.pastRemarkBy}</p>
            </div>
          ) : (
            <textarea
              type="text"
              placeholder="Remark"
              style={{ height: "16rem" }}
              value={remark}
              onChange={handleRemarkChange}
            />
          )}
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
