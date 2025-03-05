import { useEffect, useRef, useState } from "react";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useDispatch } from "react-redux";
import { setApplicationDetailToggle } from "../../../global/applicationSlice";

function ApplicationCard({ lead, set, onSet, application, toggle }) {
  const [isSelected, setIsSelected] = useState(lead?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(application?._id === set?._id);
  }, [set, application]);

  const dispatch = useDispatch();

  const handleLeadSelect = () => {
    dispatch(onSet(lead));
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

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
        <Mover num={lead.num} />
      </div>
      <div className="cardGeneral-body">
        <div className="cardGeneral-body-top">
          <NameBar lead={lead} />
          <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn>
        </div>
        <div className="cardGeneral-body-mid">
          <textarea
            type="text"
            placeholder="Add a remark"
            onClick={(e) => e.preventDefault()}
          />
        </div>

        <div className="cardGeneral-body-bottom">
          <div className="cardGeneral-body-bottom-icons">
            <div className="cardGeneral-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{lead?.applications} Applications</p>
            </div>
            <div className="cardGeneral-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{lead?.attempts} Attempts</p>
            </div>
          </div>
        </div>

        <div className="cardGeneral-body-bottom-country">
          <CountryBtn>{lead?.country}</CountryBtn>
          <div className="cardGeneral-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
