import { useState } from "react";
import ActionButtons from "./ActionButtons";
import ProfileBasicHolder from "./ProfileBasic/ProfileBasicHolder";
import ProfileSwitchNav from "./ProfileSwitchNav";
import ProfileStatusHolder from "./ProfileStatus/ProfileStatusHolder";
import ProfileDashboardHolder from "./ProfileStatus/ProfileDashboardHolder";
import { useCreateUser } from "../../hooks/useCreateUser";
import apiClient from "../../../config/axiosInstance";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { resetProfile } from "../../../global/profileSlice";
import { refetchUsers } from "../../apiHooks/useUsers";

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

  const handleCancel = () => {
    setActiveTab(0);
  };

  const handleCreate = async () => {
    setIsCreate(true);
    try {
      await apiClient.post("/user/create", userData);
      message.success("User created successfully!");
      dispatch(resetProfile());
      refetchUsers();
      setActiveTab(0);
    } catch (error) {
      console.log(error);
      message.error("User creation failed!");
    }
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
