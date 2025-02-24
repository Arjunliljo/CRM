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
function UniversityProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUniversity, setNewUniversity] = useState({
    name: "University Of United Kingdom",
    country: "United Kingdom",
    courses: ["AI", "DS", "GD", "CS"],
    image: "https://skymark.in/web/assets/images/skymarkBanner.jpg",
  });
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUniversity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const lead = {
    img: "https://via.placeholder.com/100",
    name: "College De Paris",
    title: "Student at XYZ Academy",
    location: "France",
    year: "2",
  };
  return (
    <div className="UniversityRightCard">
      <div className="UniversityRightCard-head">
        <div className="UniversityRightCard-head-info">
          <div className="UniversityRightCard-head-info-details">
            <div>
              <img src={lead.img} alt={lead.name} />
            </div>
            <div className="name-bar-name name-small">
              <div>
                {lead.name}
                <br></br>
                <p style={{ fontSize: "1rem", color: "gray" }}>
                  {lead.location}
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
                    {lead.year} Years
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
        <Requirements />
      </div>
      {/* <div className="profileCard-boxes">
        <PersonalDetails />
        <ProfileCardStatus />
      </div> */}
      <UniversityEligible />
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
          newUniversity={newUniversity}
          setNewUniversity={setNewUniversity}
          handleChange={handleChange}
        />
      </ModalBase>
    </div>
  );
}

export default UniversityProfile;
