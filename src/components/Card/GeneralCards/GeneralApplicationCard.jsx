import { useEffect, useRef, useState } from "react";
import Mover from "../../../features/Mover";
import CountryBtn from "../../../components/buttons/CountryBtn";
import InfoBtn from "../../../components/buttons/InfoBtn";
import NameBar from "../../../components/Card/NameBar";
import { getCountryName, getStatusName } from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";

function GeneralApplicationCard({
  set,
  onSet = () => {},
  application,
  toggle,
  setIsToggle,
  isAssigning,
  setToAssignGeneral,
  toAssignGeneral,
}) {
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

  const handleApplicationNormalToggle = () => {
    if (application?._id === set?._id) {
      setIsToggle(false);
      onSet(null);
    } else {
      onSet(application);
      if (!toggle) {
        setIsToggle(true);
      }
    }
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  const handleApplicationSelect = () => {
    if (isAssigning) {
      if (toAssignGeneral.includes(application)) {
        setToAssignGeneral(
          toAssignGeneral.filter((s) => s._id !== application._id)
        );
      } else {
        setToAssignGeneral([...toAssignGeneral, application]);
      }
      return;
    }
    handleApplicationNormalToggle();
  };

  const reAssignChecker = () => {
    if (toAssignGeneral.find((val) => val._id === application._id)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`cardGeneral ${isSelected ? "selectedCard" : ""}`}
      onClick={handleApplicationSelect}
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
        </div>
      </div>
    </div>
  );
}

export default GeneralApplicationCard;
