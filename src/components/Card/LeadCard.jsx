import Mover from "../../features/Mover";
import InfoBtn from "../buttons/InfoBtn";
import CountryBtn from "../buttons/CountryBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAutoLeadsAssign } from "../../../global/leadsSlice";

export default function LeadCard({ lead, set, onSet, istoggle, toggle }) {
  const [isSelected, setIsSelected] = useState(lead?._id === set?._id);
  const targetRef = useRef(null);
  const { autoLeadsAssign, curLead } = useSelector((state) => state.leads);

  useEffect(() => {
    setIsSelected(lead?._id === set?._id);
  }, [set, lead]);

  const dispatch = useDispatch();
  const handleLeadSelect = () => {
    if (lead._id === set?._id) {
      dispatch(setAutoLeadsAssign(!toggle));
    } else {
      dispatch(onSet(lead));
      if (!toggle) {
        dispatch(setAutoLeadsAssign(true));
      }
    }
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };
  console.log(set, "//////");

  return (
    <div
      className={`card ${isSelected ? "selectedCard" : ""}`}
      onClick={handleLeadSelect}
      id={`${lead?._id}`}
      ref={targetRef}
    >
      <div className="card-head">
        <Mover num={lead.num} />
      </div>
      <div className="card-body">
        <div className="card-body-top">
          <NameBar lead={lead} />
          <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn>
        </div>
        <div className="card-body-mid">
          <textarea
            type="text"
            placeholder="Add a remark"
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
              <p>{lead.applications} Applications</p>
            </div>
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{lead.attempts} Attempts</p>
            </div>
          </div>
        </div>

        <div className="card-body-bottom-country">
          <CountryBtn>{lead.country}</CountryBtn>
          <div className="card-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}
