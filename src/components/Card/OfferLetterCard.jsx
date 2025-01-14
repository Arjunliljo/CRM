import { useEffect, useRef, useState } from "react";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useDispatch } from "react-redux";

function OfferLetterCard({ offerletter, set, onSet }) {
  const [isSelected, setIsSelected] = useState(offerletter?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(offerletter?._id === set?._id);
  }, [set, offerletter]);

  const dispatch = useDispatch();
  const handleLeadSelect = () => {
    dispatch(onSet(offerletter));
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  return (
    <div
      className={`card ${isSelected ? "selectedCard" : ""}`}
      onClick={handleLeadSelect}
      id={`${offerletter?._id}`}
      ref={targetRef}
    >
      <div className="card-head">
        <Mover num={offerletter.num} />
      </div>
      <div className="card-body">
        <div className="card-body-top">
          <NameBar lead={offerletter} />
          <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn>
        </div>
        <div className="card-body-mid">
          <textarea
            type="text"
            placeholder="Interested in Pursuing Biotechbology"
            onClick={(e) => e.preventDefault()}
          />
        </div>

        <div className="card-body-bottom">
          <div className="card-body-bottom-icons">
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{offerletter.applications} Applications</p>
            </div>
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{offerletter.attempts} Attempts</p>
            </div>
          </div>
        </div>

        <div className="card-body-bottom-country">
          <CountryBtn>{offerletter.country}</CountryBtn>
          <div className="card-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}

export default OfferLetterCard;
