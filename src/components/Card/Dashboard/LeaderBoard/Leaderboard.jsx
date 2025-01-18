import HomeIcon from "../../../utils/Icons/HomeIcon";
import CIrclePlus from "../../../buttons/CIrclePlus";
import LeaderBoardItem from "./LeaderBoardItem";

export default function Leaderboard() {
  const leaders = [
    {
      id: 12,
      name: "Lana",
      score: 41,
      position: "#12",
      avatar: "/path/to/lana.jpg",
    },
    {
      id: 13,
      name: "Aswathi",
      score: 39,
      position: "#13",
      avatar: "/path/to/aswathi.jpg",
    },
    {
      id: 14,
      name: "Arun",
      score: 36,
      position: "#14",
      avatar: "/path/to/arun.jpg",
    },
  ];

  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <h2 className="title">Leaderboard</h2>
        <CIrclePlus>
          <HomeIcon path="trophy" color="#000000f8" />
        </CIrclePlus>
      </div>

      <div className="leaderboard__content">
        {leaders.map((leader, index) => (
          <LeaderBoardItem key={leader.id} leader={leader} index={index} />
        ))}
      </div>

      <div className="leaderboard__stat-item leaderboard__stat-item--negative">
        <span className="leaderboard__stat-value">-11.3%</span>
        <span className="leaderboard__stat-label">From last week</span>
      </div>
    </div>
  );
}
