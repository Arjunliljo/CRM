import HomeIcon from "../../../utils/Icons/HomeIcon";
import Mover from "../../../../features/Mover";
import WorkItemTop from "./WorkItemTop";

export default function MyWorkItem({ index, item }) {
  return (
    <div key={index} className={`work-item ${item.color}`}>
      <div className="work-item-content">
        <WorkItemTop item={item} />
        <span className="work-item-content-program">{item.program}</span>
        <Mover num={item.num} />
        <div className="work-item-footer">
          <span className="work-item-content-sm-bold">{item.status}</span>
          <span className="work-item-footer-date">
            {item.date}
            <p>at {item.time}</p>
          </span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
