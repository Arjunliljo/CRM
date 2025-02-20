import Mover from "../../features/Mover";
import InfoBtn from "../buttons/InfoBtn";
import CountryBtn from "../buttons/CountryBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLeadDetailToggle } from "../../../global/leadsSlice";
import { useApi } from "../../context/apiContext/ApiContext";
import { getStatusName } from "../../service/nameFinders";

export default function LeadCard({ lead, set, onSet, toggle }) {
  const [isSelected, setIsSelected] = useState(lead?._id === set?._id);

  const {
    statusConfigs: { statuses },
  } = useApi();

  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(lead?._id === set?._id);
  }, [set, lead]);

  const dispatch = useDispatch();

  const statusName = getStatusName(lead?.status, statuses);

  const handleLeadSelect = () => {
    if (lead._id === set?._id) {
      dispatch(setLeadDetailToggle(!toggle));
    } else {
      dispatch(onSet(lead));
      if (!toggle) {
        dispatch(setLeadDetailToggle(false));
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
      className={`card ${isSelected ? "selectedCard" : ""}`}
      onClick={handleLeadSelect}
      id={`${lead?._id}`}
      ref={targetRef}
    >
      <div className="card-head">
        <Mover num={lead.num} />
      </div>
      <div className="card-body">
        <div className="card-body-top" style={{ textWrap: "nowrap" }}>
          <NameBar lead={lead} />
          <InfoBtn
            color="white"
            bgcl={lead?.status === "Interested" ? "green" : "black"}
          >
            {statusName}
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
              <p>{lead?.application?.length} Applications</p>
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
          <CountryBtn>{lead.country || "N/A"}</CountryBtn>
          <div className="card-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}
