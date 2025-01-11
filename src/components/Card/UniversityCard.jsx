import { useDispatch } from "react-redux";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useEffect, useRef, useState } from "react";
import Students from "../../pages/Students/Students";
import PrimaryBttn from "../buttons/PrimaryBttn";
import EligibleBttn from "../buttons/EligibleBttn";
import { color } from "framer-motion";

function UniversityCard({ university, set, onSet }) {
  const [isSelected, setIsSelected] = useState(university?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(university?._id === set?._id);
  }, [set, university]);

  const dispatch = useDispatch();
  const handleStudentSelect = () => {
    dispatch(onSet(university));
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  return (
    <div
      className={`cardUniversity ${isSelected ? "selectedCard" : ""}`}
      onClick={handleStudentSelect}
      id={`${university?._id}`}
      ref={targetRef}
    >
      <div className="cardUniversity-head">
        <p className="cardHead">{university.Uname}</p>
        {/* <Mover num={university.num} /> */}
      </div>
      <div className="cardUniversity-body">
        {/* <div className="card-body-top">
          <NameBar lead={university} />
          <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn>
        </div> */}
        <div className="cardUniversity-body-mid">
          <textarea
            type="text"
            placeholder="Add a remark"
            onClick={(e) => e.preventDefault()}
          />
        </div>

        <div className="cardUniversity-body-bottom">
          <div className="cardUniversity-body-bottom-iconsUniversity">
            <div className="cardUniversity-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p> Stayback: {university.year} Years</p>
            </div>
            <div className="cardUniversity-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>Fee: {university.fee}$ </p>
            </div>
          </div>
        </div>

        <div className="cardUniversity-body-bottom-countryEligible">
          <CountryBtn>{university.eligibility}</CountryBtn>
          <CountryBtn style={{ backgroundColor: "#0075fc" }}>
            {university.country}
          </CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default UniversityCard;
