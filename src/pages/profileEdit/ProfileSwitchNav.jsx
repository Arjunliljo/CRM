// ProfileSwitchNav Component
export default function ProfileSwitchNav({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="profile-nav">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`nav-item ${activeTab === index ? "profile-active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
