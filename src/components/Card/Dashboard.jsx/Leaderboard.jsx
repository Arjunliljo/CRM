import HomeIcon from "../../utils/Icons/HomeIcon";

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
        <h2 className="leaderboard__title">Leaderboard</h2>
        <button className="add-button">
          <HomeIcon
            path="trophy"
            color="#000000f8"
          />
        </button>
      </div>

      <div className="leaderboard__content">
        {leaders.map((leader, index) => (
          <div key={leader.id} className="leaderboard__item">
            <div className="leaderboard__position">{leader.position}</div>
            <div
              className={`leaderboard__avatar ${index === 1 ? "leaderboard__avatar--center" : ""
                }`}
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-
resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                alt={leader.name}
              />
            </div>
            <div className="leaderboard__info">
              <span className="leaderboard__name">{leader.name}</span>
              <span className="leaderboard__score">{leader.score}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard__stat-item leaderboard__stat-item--negative">
        <span className="leaderboard__stat-value">-11.3%</span>
        <span className="leaderboard__stat-label">From last week</span>
      </div>
    </div >
  );
}
