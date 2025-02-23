import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineInterests } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import EligibleBttn from "../../buttons/EligibleBttn";
import { getStatusName } from "../../../service/nameFinders";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProfileCardStatus({
  statuses,
  lead,
  countries,
  onsubmit,
}) {
  const initialStatus =
    statuses?.find((s) => s.name === getStatusName(lead?.status, statuses)) ||
    statuses?.[0];
  const [status, setStatus] = useState(initialStatus);
  const [remark, setRemark] = useState("");

  // Store the full country object
  const initialCountry =
    countries?.find((c) => c._id === lead?.country) || countries?.[0];
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [showPastRemark, setShowPastRemark] = useState(false);
  const [followupDate, setFollowupDate] = useState(new Date());

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

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
    // Find the status object that matches the selected name
    const selectedStatus = statuses.find((s) => s.name === e.target.value);
    setStatus(selectedStatus);
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(country);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
    setShowPastRemark(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const statusData = {
      status: status?._id,
      remark: remark,
      country: selectedCountry?._id, // Send country ID
      followupDate: followupDate,
      leadId: lead?._id,
    };
    onsubmit(statusData);
  };

  return (
    <div className="profileCard-box personal-status">
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
      <form className="personal-status-elements" onSubmit={handleSave}>
        <span className="personal-status-html-for">Current status</span>
        <div className="select-container">
          <MdOutlineInterests className="select-icon" />
          <select
            className="selector-with-icon"
            value={status?.name}
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
            value={selectedCountry?.name}
            onChange={handleCountryChange}
          >
            {countries?.map((country) => (
              <option value={country.name} key={country._id}>
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
              <p className="past-remark-info">
                Managed by: {lead?.pastRemarkBy}
              </p>
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
          <EligibleBttn type="submit">Save</EligibleBttn>
        </div>
      </form>
    </div>
  );
}
