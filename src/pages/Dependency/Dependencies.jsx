import { useState } from "react";
import ActionButtons from "./ActionButtons";
import ProfileSwitchNav from "./ProfileSwitchNav";
import RoleBasicHolder from "./RoleDependency/RoleBasicHolder";
import BranchBasicHolder from "./BranchDependency/BranchBasicHolder";
import CountryBasicHolder from "./CountryDependency/CountryBasicHolder";
import StatusBasicHolder from "./StatusDependency/StatusBasicHolder";

const TABS = ["Add Branch", "Add Country", "Add Role", "Add Status"];

function Dependencies() {
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleCancel = () => {
    setActiveTab(0);
  };

  return (
    <div className="profileUpdate-main">
      <ProfileSwitchNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
      />
      {activeTab === 0 && <BranchBasicHolder />}
      {activeTab === 1 && <CountryBasicHolder />}
      {activeTab === 2 && <RoleBasicHolder />}
      {activeTab === 3 && <StatusBasicHolder />}
      <ActionButtons onHandleNext={handleNext} onHandleCancel={handleCancel} />
    </div>
  );
}

export default Dependencies;
