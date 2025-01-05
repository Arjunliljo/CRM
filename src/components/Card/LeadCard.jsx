import Mover from "../../features/Mover";
import InfoBtn from "../buttons/InfoBtn";
import CountryBtn from "../buttons/CountryBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";

const info = {
  num: 3,
  name: "John Doe",
  img: "https://via.placeholder.com/150",
  number: 1234567890,
  status: "Interested",
  statusColor: "red",
  remark:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  applications: 2,
  attempts: 1,
  country: "Germany",
  count: 3,
};

export default function LeadCard() {
  return (
    <div className="card">
      <div className="card-head">
        <Mover num={info.num} />
      </div>
      <div className="card-body">
        <div className="card-body-top">
          <NameBar info={info} />
          <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn>
        </div>
        <div className="card-body-mid">
          <textarea type="text" placeholder="Add a remark" />
        </div>

        <div className="card-body-bottom">
          <div className="card-body-bottom-icons">
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{info.applications} Applications</p>
            </div>
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{info.attempts} Attempts</p>
            </div>
          </div>
        </div>

        <div className="card-body-bottom-country">
          <CountryBtn>{info.country}</CountryBtn>
          <div className="card-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}
