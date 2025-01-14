
export default function Leaderboard() {
  const leaders = [
    { id: 12, name: 'Lana', score: 41, position: '#12', avatar: '/path/to/lana.jpg' },
    { id: 13, name: 'Aswathi', score: 39, position: '#13', avatar: '/path/to/aswathi.jpg' },
    { id: 14, name: 'Arun', score: 36, position: '#14', avatar: '/path/to/arun.jpg' }
  ];

  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <h2 className="leaderboard__title">Leaderboard</h2>
        <button className="leaderboard__trophy-btn">
          <span className="leaderboard__trophy-icon">🏆</span>
        </button>
      </div>

      <div className="leaderboard__content">
        {leaders.map((leader) => (
          <div key={leader.id} className="leaderboard__item">
            <div className="leaderboard__position">{leader.position}</div>
            <div className="leaderboard__avatar">
              <img src={leader.avatar} alt={leader.name} />
            </div>
            <div className="leaderboard__info">
              <span className="leaderboard__name">{leader.name}</span>
              <span className="leaderboard__score">{leader.score}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard__stats">
        <div className="leaderboard__stat-item leaderboard__stat-item--negative">
          <span className="leaderboard__stat-value">-11.3%</span>
          <span className="leaderboard__stat-label">From last week</span>
        </div>
      </div>
    </div>
  );
};
