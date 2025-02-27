import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionButtons from "../ActionButtons";
import ProfileBasicHolder from "../ProfileBasic/ProfileBasicHolder";
import ProfileSwitchNav from "../ProfileSwitchNav";
import ProfileStatusHolder from "../ProfileStatus/ProfileStatusHolder";
import ProfileDashboardHolder from "../ProfileStatus/ProfileDashboardHolder";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProfile,
  setProfileEmail,
  setProfileName,
  setProfileContactNumber,
  setProfileEmployeeId,
  setProfileAddressOne,
  setProfileAddressTwo,
  setProfileAutoAssign,
  setProfileBranches,
  setProfileCountries,
  setProfilePassword,
  setProfileRole,
  setProfileMainStatus,
  setSelectedTabs,
  setSelectedRoles,
} from "../../../../global/profileSlice";
import CancelBtn from "../../../components/buttons/CancelBtn";
import { refetchUsers } from "../../../apiHooks/useUsers";

const TABS = ["Profile", "Status", "Dashboard"];

function UserProfileEdit() {
  const location = useLocation();
  const { user } = location.state || {};
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();


  console.log(user, "user");

  useEffect(() => {
    if (user) {
      dispatch(setProfileEmail(user.email));
      dispatch(setProfileName(user.name));
      dispatch(setProfileContactNumber(user.phone));
      dispatch(setProfileEmployeeId(user.employeeId));
      dispatch(setProfileAddressOne(user.addressOne));
      dispatch(setProfileAddressTwo(user.addressTwo));
      dispatch(setProfileAutoAssign(user.autoAssign));
      dispatch(setProfileBranches(user.branches));
      dispatch(setProfileCountries(user.countries));
      // dispatch(setProfilePassword(user.password));
      dispatch(setProfileRole(user.role));
      dispatch(setProfileMainStatus(user.statuses));
      dispatch(setSelectedTabs(user.defaultTabs));
      dispatch(setSelectedRoles(user.roles));
    }

    // Cleanup function to reset profile on unmount
    return () => {
      dispatch(resetProfile());
    };
  }, [user, dispatch]);
  const profileData = useSelector((state) => state.profile);
  console.log(profileData, "profileData");

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
    await apiClient.patch(`/user/${user._id}`, profileData);
    message.success("User updated successfully!");
    refetchUsers();
    navigate("/user");
    dispatch(resetProfile());
    setActiveTab(0);
  };

  return (
    <div className="profileUpdate-main">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <CancelBtn onClick={() => navigate(-1)}>back</CancelBtn>
      </div>

      <ProfileSwitchNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
        isCreate={isCreate}
      />
      {activeTab === 0 && <ProfileBasicHolder isCreate={isCreate}  isEdit={true}/>}
      {activeTab === 1 && <ProfileStatusHolder isCreate={isCreate} />}
      {activeTab === 2 && <ProfileDashboardHolder />}
      <ActionButtons
        onHandleNext={handleNext}
        onHandleCancel={handleCancel}
        activeTab={activeTab}
        onHandleCreate={handleCreate}
        isEdit={true}
      />
    </div>
  );
}

export default UserProfileEdit;
