import ArrowBlue from "../../../buttons/ArrowBlue";
import HomeIcon from "../../../utils/Icons/HomeIcon";

export default function LeadCardItems({ item }) {
  return (
    <div className="lead-item">
      <div className="lead-item-btn-box">
        <ArrowBlue>
          <HomeIcon path="arrow" color="#fffffff8" />
        </ArrowBlue>
      </div>
      <div className="lead-count">
        <span className="count">{item.count}</span>
      </div>
      <span className={`label ${item.color}`}>{item.label}</span>
    </div>
  );
}
