import ProfileBasic from "./ProfileBasic";
import ProfileInfo from "./ProfileInfo";
import BranchSelector from "../ProfileDynamicSelectors/BranchSelector";
import CountrySelector from "../ProfileDynamicSelectors/CountrySelector";

export default function ProfileBasicHolder({ isCreate, isEdit }) {
  return (
    <div className="profile-edit-container">
      <div className="profile-content">
        <ProfileBasic isCreate={isCreate} isEdit={isEdit} />
        <ProfileInfo isCreate={isCreate} isEdit={isEdit} />
      </div>
      <div className="profile-content-dynamic">
        <BranchSelector isCreate={isCreate} />
        <CountrySelector isCreate={isCreate} />
      </div>
    </div>
  );
}
