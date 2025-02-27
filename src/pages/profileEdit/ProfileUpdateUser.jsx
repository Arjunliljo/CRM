import { useState } from "react";
import ActionButtons from "./ActionButtons";
import ProfileBasicHolder from "./ProfileBasic/ProfileBasicHolder";
import ProfileSwitchNav from "./ProfileSwitchNav";
import ProfileStatusHolder from "./ProfileStatus/ProfileStatusHolder";
import ProfileDashboardHolder from "./ProfileStatus/ProfileDashboardHolder";
import { useCreateUser } from "../../hooks/useCreateUser";
import apiClient from "../../../config/axiosInstance";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetProfile } from "../../../global/profileSlice";

const TABS = ["Profile", "Status", "Dashboard"];

function ProfileUpdateUser() {
  const [activeTab, setActiveTab] = useState(0);
  const userData = useCreateUser();
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);

  const handleNext = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const profileData = useSelector((state) => state.profile);
  console.log(profileData, "profaaaaaaaaaaaaaileData");


  const handleCancel = () => {
    setActiveTab(0);
  };

  const handleCreate = async () => {
    setIsCreate(true);
    await apiClient.post("/user/create", userData);
    message.success("User created successfully!");
    dispatch(resetProfile());
    setActiveTab(0);
  };

  return (
    <div className="profileUpdate-main">
      <ProfileSwitchNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
        isCreate={isCreate}
      />
      {activeTab === 0 && <ProfileBasicHolder isCreate={isCreate} />}
      {activeTab === 1 && <ProfileStatusHolder isCreate={isCreate} />}
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
