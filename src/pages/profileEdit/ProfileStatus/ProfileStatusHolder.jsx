import ProfileBasic from "../ProfileBasic/ProfileBasic";
import ProfileInfo from "../ProfileBasic/ProfileInfo";
import MainStatus from "./MainStatus";
import SubStatus from "./SubStatus";
import Tabs from "./Tabs";

export default function ProfileStatusHolder() {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <MainStatus />
        <SubStatus />
        <Tabs />
      </div>
    </div>
  );
}
