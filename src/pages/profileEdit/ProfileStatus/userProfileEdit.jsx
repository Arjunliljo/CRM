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
import { useCreateUser } from "../../../hooks/useCreateUser";
import { setCurUser } from "../../../../global/userSlice";
const TABS = ["Profile", "Status", "Dashboard"];

function UserProfileEdit() {
  const location = useLocation();
  const { user } = location.state || {};
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();

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
      dispatch(setProfilePassword(user.password));
      dispatch(setProfileRole(user.role));
      dispatch(setProfileMainStatus(user.statuses));
      dispatch(setSelectedTabs([...user.defaultTabs.map((tab,i) => ({name: tab, id: i +1})), ...user.tabs]));
      dispatch(setSelectedRoles(user.roles));
    }

    // Cleanup function to reset profile on unmount
    return () => {
      dispatch(resetProfile());
    };
  }, [user, dispatch]);
  const userData =useCreateUser();

  const handleNext = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleCancel = () => {
    setActiveTab(0);
    dispatch(resetProfile());
    navigate(-1);
  };

  const handleUpdate = async () => {
    setIsCreate(true);
   const response = await apiClient.patch(`/user/${user._id}`, userData);
    message.success("User updated successfully!");
    refetchUsers();
    navigate("/user");
    dispatch(resetProfile());
    console.log(response.data.data.data);
    dispatch(setCurUser(response.data.data.data));
    setActiveTab(0);
  };

  return (
    <div className="profileUpdate-main">
      <div className="profileUpdate-main-header">
        <h2 style={{margin:0 }}>Update Profile</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            // marginBottom: "1rem",
          }}
      >
        <CancelBtn onClick={() => navigate(-1)}>back</CancelBtn>
        </div>
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
        onHandleCreate={handleUpdate}
        isEdit={true}
      />
    </div>
  );
}

export default UserProfileEdit;
