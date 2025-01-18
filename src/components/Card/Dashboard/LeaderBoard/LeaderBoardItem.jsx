import React from "react";

export default function LeaderBoardItem({ leader, index }) {
  return (
    <div key={leader.id} className="leaderboard__item">
      <div className="leaderboard__position">{leader.position}</div>
      <div
        className={`leaderboard__avatar ${
          index === 1 ? "leaderboard__avatar--center" : ""
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
  );
}
