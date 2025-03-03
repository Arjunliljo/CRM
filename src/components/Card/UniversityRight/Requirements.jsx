import { useApi } from "../../../context/apiContext/ApiContext";
import { getQualificationName } from "../../../service/nameFinders";

function Requirements({ requirements = [] }) {
  const { qualificationsConfigs } = useApi();
  const { qualifications = [] } = qualificationsConfigs;

  const qualificationsArray = requirements.map((qualificationId) => {
    // Check if qualificationId is valid
    if (!qualificationId) return null;

    const qualificationData = getQualificationName(qualificationId, qualifications);
    if (!qualificationData) return null;

    return {
      name: qualificationData.name,
      mark: qualificationData.mark,
      _id: qualificationData._id
    };
  }).filter(Boolean) || [];

  return (
    <div className="entry-requirements">
      <h2>Entry Requirements</h2>
      <div className="requirements-grid">
        { qualificationsArray.length > 0 ? qualificationsArray.map((requirement, index) => (
          <div key={requirement._id || index} className="requirement-item">
            <span className="requirement-bullet">●</span>
            {requirement.name} {requirement.mark && `: ${requirement.mark}`}
          </div>
        )) : (
          <div className="no-courses-message" style={{
            padding: '20px',
            textAlign: 'center',
            color: '#666',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            margin: '10px 0'
          }}>
            No Requirements available
          </div>
        ) }
      </div>
    </div>
  );
}

export default Requirements;
