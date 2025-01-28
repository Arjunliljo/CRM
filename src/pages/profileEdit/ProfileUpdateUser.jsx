import { useState } from "react";
import ActionButtons from "./ActionButtons";
import ProfileBasicHolder from "./ProfileBasic/ProfileBasicHolder";
import ProfileSwitchNav from "./ProfileSwitchNav";
import ProfileStatusHolder from "./ProfileStatus/ProfileStatusHolder";
import ProfileDashboardHolder from "./ProfileStatus/ProfileDashboardHolder";

const TABS = ["Profile", "Status", "Dashboard"];

function ProfileUpdateUser() {
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleCancel = () => {
    setActiveTab(0);
  };

  const handleCreate = () => {
    console.log("create");
  };

  return (
    <div className="profileUpdate-main">
      <ProfileSwitchNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
      />
      {activeTab === 0 && <ProfileBasicHolder />}
      {activeTab === 1 && <ProfileStatusHolder />}
      {activeTab === 2 && <ProfileDashboardHolder />}
      <ActionButtons
        onHandleNext={handleNext}
        onHandleCancel={handleCancel}
        activeTab={activeTab}
        onHandleCreate={handleCreate}
      />
    </div>
  );
}

export default ProfileUpdateUser;
