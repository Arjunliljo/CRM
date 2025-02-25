import ProfileBasic from "./ProfileBasic";
import ProfileInfo from "./ProfileInfo";
import BranchSelector from "../ProfileDynamicSelectors/BranchSelector";
import CountrySelector from "../ProfileDynamicSelectors/CountrySelector";

export default function ProfileBasicHolder({ isCreate }) {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <ProfileBasic isCreate={isCreate} />
        <ProfileInfo isCreate={isCreate} />
      </div>
      <div className="profile-content-dynamic">
        <BranchSelector isCreate={isCreate} />
        <CountrySelector isCreate={isCreate} />
      </div>
    </div>
  );
}
