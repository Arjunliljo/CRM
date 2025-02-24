import { useDispatch } from "react-redux";
import CountryBtn from "../buttons/CountryBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import { useEffect, useRef, useState } from "react";
import { setAutoUniversitysAssign } from "../../../global/universitySlice";

function UniversityCard({ university, set, onSet, istoggle, toggle }) {

  const [isSelected, setIsSelected] = useState(university?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(university?._id === set?._id);
  }, [set, university]);

  const dispatch = useDispatch();

  const handleStudentSelect = () => {
    if (university._id === set?._id) {
      dispatch(setAutoUniversitysAssign(!toggle));
    } else {
      dispatch(onSet(university));
      if (!toggle) {
        dispatch(setAutoUniversitysAssign(false));
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
      className={`cardUniversity ${isSelected ? "selectedCard" : ""}`}
      onClick={handleStudentSelect}
      id={`${university?._id}`}
      ref={targetRef}
    >
      <div className="cardUniversity-head">
        <p className="cardHead">{university.name}</p>
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
            placeholder="About:"
            onClick={(e) => e.preventDefault()}
          />
        </div>

        <div className="cardUniversity-body-bottom">
          <div className="cardUniversity-body-bottom-iconsUniversity">
            <div className="cardUniversity-body-bottom-icons-item">
              <HomeIcon
                path="stayback"
                color="#00b100"
                // style={{ transform: "rotate(270deg)" }}
              />
              <p>
                <span style={{ color: "gray" }}>Stayback:</span>
                <span style={{ color: "black" }}> {university.year} Years</span>
              </p>
            </div>
            <div className="cardUniversity-body-bottom-icons-item">
              <HomeIcon
                path="payments"
                color="#0075fc"
                // style={{ transform: "rotate(270deg)" }}
              />
              <p>
                {" "}
                <span style={{ color: "gray" }}>Fee:</span> {university.fee}${" "}
              </p>
            </div>
          </div>
        </div>

        <div className="cardUniversity-body-bottom-countryEligible">
          <CountryBtn>{university?.eligibility || "No Eligibility"}</CountryBtn>
          <CountryBtn style={{ backgroundColor: "#0075fc" }}>
            {university?.country?.name || "No Country"}
          </CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default UniversityCard;
