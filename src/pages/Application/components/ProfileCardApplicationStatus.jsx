import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineInterests } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import EligibleBttn from "../../../components/buttons/EligibleBttn";
import { getCountryName, getStatusName } from "../../../service/nameFinders";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getStatusId } from "../../../service/IdFinders";
import { message } from "antd";
import { useDispatch } from "react-redux";

export default function ProfileCardApplicationStatus({
  statuses,
  application,
  countries,
  onSubmit,
  curStudent,
}) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(
    getStatusName(application?.status, statuses)
  );
  const [followupDate, setFollowupDate] = useState(
    application?.followupDate || new Date()
  );
  const [country, setCountry] = useState(
    getCountryName(application?.country, countries)
  );
  const [remark, setRemark] = useState(application?.remark);

  useEffect(() => {
    setStatus(getStatusName(application?.status, statuses));
    setFollowupDate(application?.followupDate || new Date());
    setCountry(getCountryName(application?.country, countries));
    setRemark(application?.remark);
  }, [application, curStudent, statuses, countries]);

  const handleSave = (e) => {
    e.preventDefault();

    const countryId = countries?.find((con) => {
      return con.name === country;
    })?._id;

    if (!countryId) {
      message.error("Please select a country");
      return;
    }

    onSubmit(
      {
        status: getStatusId(status, statuses),
        followupDate,
        country: countryId,
        remark,
      },
      dispatch,
      application?._id
    );
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
      <form
        className="personal-status-elements"
        onSubmit={(e) => {
          e.preventDefault();
          onsubmit({ status, followupDate, country, remark });
        }}
      >
        <span className="personal-status-html-for">Current status</span>
        <div className="select-container">
          <MdOutlineInterests className="select-icon" />
          <select
            className="selector-with-icon"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries?.map((country) => (
              <option value={country?.name} key={country?._id}>
                {country?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-body-mid">
          {application?.pastRemark ? (
            <div className="past-remark">
              <p>Previous Remark:</p>
              <p>{application?.pastRemark}</p>
              <p className="past-remark-info">
                Managed by: {application?.pastRemarkBy}
              </p>
            </div>
          ) : (
            <textarea
              type="text"
              placeholder="Remark"
              style={{ height: "16rem" }}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          )}
        </div>
        <div className="personal-status-bottom-set"></div>
        <div className="eligible-head">
          <EligibleBttn onClick={handleSave}>Save</EligibleBttn>
        </div>
      </form>
    </div>
  );
}
