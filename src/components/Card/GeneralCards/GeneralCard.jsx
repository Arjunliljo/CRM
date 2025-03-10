import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import Mover from "../../../features/Mover";
import NameBar from "../NameBar";
import InfoBtn from "../../buttons/InfoBtn";
import HomeIcon from "../../utils/Icons/HomeIcon";
import CountryBtn from "../../buttons/CountryBtn";

function GeneralCard({ general, set, onSet }) {
  const [isSelected, setIsSelected] = useState(general?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(general?._id === set?._id);
  }, [set, general]);

  const dispatch = useDispatch();
  const handleLeadSelect = () => {
    dispatch(onSet(general));
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
      onClick={handleLeadSelect}
      id={`${general?._id}`}
      ref={targetRef}
    >
      <div className="cardGeneral-head">
        <Mover num={general.num} />
      </div>
      <div className="cardGeneral-body">
        <div className="cardGeneral-body-top">
          <NameBar lead={general} />
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
              <p>{general.applications} Applications</p>
            </div>
            <div className="cardGeneral-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{general.attempts} Attempts</p>
            </div>
          </div>
        </div>

        <div className="cardGeneral-body-bottom-country">
          <CountryBtn>{general.country}</CountryBtn>
          <div className="cardGeneral-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}

export default GeneralCard;
