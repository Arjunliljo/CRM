import { useEffect, useRef, useState } from "react";
import Mover from "../../../features/Mover";
import CountryBtn from "../../../components/buttons/CountryBtn";
import InfoBtn from "../../../components/buttons/InfoBtn";
import NameBar from "../../../components/Card/NameBar";
import { useDispatch } from "react-redux";
import { setApplicationDetailToggle } from "../../../../global/applicationSlice";
import { getCountryName, getStatusName } from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";

function ApplicationCard({ set, onSet, application, toggle }) {
  const [isSelected, setIsSelected] = useState(
    application?.lead?._id === set?._id
  );
  const targetRef = useRef(null);

  const { countryConfigs, statusConfigs } = useApi();
  const { countries = [] } = countryConfigs;
  const { statuses = [] } = statusConfigs;

  useEffect(() => {
    setIsSelected(application?._id === set?._id);
  }, [set, application]);

  const dispatch = useDispatch();

  const handleApplicationNormalToggle = () => {
    if (application._id === set?._id) {
      dispatch(setApplicationDetailToggle(!toggle));
    } else {
      dispatch(onSet(application));
      if (!toggle) {
        dispatch(setApplicationDetailToggle(false));
      }
    }
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  return (
    <div
      className={`cardGeneral ${isSelected ? "selectedCard" : ""}`}
      onClick={handleApplicationNormalToggle}
      id={`${application?._id}`}
      ref={targetRef}
    >
      <div className="cardGeneral-head">
        <Mover num={application?.lead?.num} />
      </div>
      <div className="cardGeneral-body">
        <div className="cardGeneral-body-top">
          <NameBar lead={application?.lead} />
          <InfoBtn color="white" bgcl="green">
            {getStatusName(application?.status, statuses)}
          </InfoBtn>
        </div>
        <div className="cardGeneral-body-mid">
          <textarea
            type="text"
            placeholder="Add a remark"
            onClick={(e) => e.preventDefault()}
          />
        </div>

        <div className="cardGeneral-body-bottom-country">
          <CountryBtn>
            {getCountryName(application?.country, countries)}
          </CountryBtn>
          {/* <div className="cardGeneral-body-bottom-country-count">
            {lead?.attemps}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
