import { useState } from "react";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import HomeIcon from "../../utils/Icons/HomeIcon";
import ActivityLog from "../ProfileCard/ActivityLog";
import EligiableCourses from "../ProfileCard/EligiableCourses";
import PersonalDetails from "../ProfileCard/PersonalDetails";
import ProfileCardStatus from "../ProfileCard/ProfileCardStatus";
import UniversityEligible from "../ProfileCard/UniversityEligible";
import Requirements from "./Requirements";
import ModalBase from "../../Forms/ModalBase";
import UpdateUniversity from "../../Forms/University/UpdateUniversity";
import { useApi } from "../../../context/apiContext/ApiContext";

function UniversityProfile({ university }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { countryConfigs, universityConfigs } = useApi();
  const { countries = [] } = countryConfigs;
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const minDurationInMonths =
    university?.courses?.length > 0
      ? Math.min(...university.courses.map((course) => course.duration))
      : 0; // Default to 0 if no courses are available

  const minDurationInYears = (minDurationInMonths / 12).toFixed(1);

  const minFee =
    university?.courses?.length > 0
      ? Math.min(
          ...university.courses.map((course) => {
            console.log("Course fee:", course?.fee); // Debug individual course fees
            return course?.fee || Infinity; // Use Infinity instead of 0 as fallback
          })
        )
      : 0;

  return (
    <div className="UniversityRightCard">
      <div className="UniversityRightCard-head">
        <div className="UniversityRightCard-head-info">
          <div className="UniversityRightCard-head-info-details">
            <div>
              <img
                style={{ width: "100px", height: "100px" }}
                src={university.img}
                alt={university.name}
              />
            </div>
            <div className="name-bar-name name-small">
              <div>
                {university && university?.name}
                <br></br>
                <p style={{ fontSize: "1rem", color: "gray" }}>
                  {university?.country?.name}
                </p>
              </div>
              <div className="UniversityRightCard-head-info-location-card">
                <span className="UniversityRightCard-head-info-location"></span>
              </div>
              <div className="cardUniversity-body-bottom-icons-item">
                <HomeIcon path="stayback" color="#00b100" />
                <p>
                  <span style={{ fontSize: "0.8rem", color: "gray" }}>
                    Stayback:{" "}
                  </span>
                  <span style={({ color: "black" }, { fontSize: "0.8rem" })}>
                    {university && minDurationInYears} Years
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="UniversityRightCard-head-info-right-card">
            <PrimaryBttn
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                marginBottom: "4rem",
              }}
              onClick={handleModal}
            >
              Edit
            </PrimaryBttn>
          </div>
        </div>
      </div>
      <div>
        <Requirements requirements={university.qualifications} />
      </div>
      {/* <div className="profileCard-boxes">
        <PersonalDetails />
        <ProfileCardStatus />
      </div> */}
      <UniversityEligible courses={university.courses} />
      {/* <ActivityLog /> */}
      <ModalBase
        title="Update University"
        isOpen={isModalOpen}
        closeModal={closeModal}
        width="50%"
      >
        <UpdateUniversity
          isUpadte={true}
          closeModal={closeModal}
          // newUniversity={newUniversity}
          // setNewUniversity={setNewUniversity}
          // handleChange={handleChange}
          university={university}
          countries={countries}
        />
      </ModalBase>
    </div>
  );
}

export default UniversityProfile;
