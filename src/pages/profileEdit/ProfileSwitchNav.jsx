// ProfileSwitchNav Component
import { HiMiniExclamationCircle } from "react-icons/hi2";

import { useSelector } from "react-redux";
export default function ProfileSwitchNav({
  activeTab,
  setActiveTab,
  tabs,
  isCreate,
}) {
  const profileData = useSelector((state) => state.profile);

  const hasEmptyFields = () => {
    return (
      !profileData.addressOne ||
      !profileData.addressTwo ||
      !profileData.contactNumber ||
      !profileData.email ||
      !profileData.employeeId ||
      !profileData.name ||
      !profileData.password ||
      !profileData.branches?.length ||
      !profileData.countries?.length
    );
  };

  const hasEmptyStatusFields = () => {
    return (
      !profileData.mainStatuses?.length ||
      !profileData.selectedTabs?.length ||
      !profileData.selectedRoles?.length
    );
  };

  return (
    <div className="profile-nav">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`nav-item ${activeTab === index ? "profile-active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
          {((isCreate &&
            tab === "Profile" &&
            hasEmptyFields() &&
            activeTab !== index) ||
            (isCreate &&
              tab === "Status" &&
              hasEmptyStatusFields() &&
              activeTab !== index)) && (
            <HiMiniExclamationCircle className="error-icon" />
          )}
        </button>
      ))}
    </div>
  );
}
