import { useState } from "react";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import BlackSelector from "../../Selectors/BlackSelector";
import ModalBase from "../../Forms/ModalBase";
import AddCourse from "./AddCourse";

function UniversityEligible() {
  const Countries = ["Country", "Option 2", "Option 3"];
  const courses = ["UG", "Option 2", "Option 3"];
  const Offer = ["Fees", "Option 2", "Option 3"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [university, setNewUniversity] = useState("");

  const handleOptionChange = (newOption) => {
    console.log("Selected Option:", newOption);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUniversity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const eligibleCourses = [
    {
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: "2000",
    },
    {
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
  ];

  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  return (
    <div className="university-eligiable-courses">
      <div
        className="name-small"
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Courses</div>
        <div>
          <PrimaryBttn onClick={handleModal}>Add Course</PrimaryBttn>
        </div>
      </div>
      {/* <div className="eligiable-courses-qualifications">
        <div className="card-number profileCard-head-info-keys">
          {qualifications.map((item, index) => (
            <span key={index}>{item.qualification}</span>
          ))}
        </div>
        <div className="profileCard-head-info-assigners">
          {qualifications.map((item, index) => (
            <span key={index}>
              {item.score} {item.institution && item.institution}
            </span>
          ))}
        </div>
      </div> */}

      <div className="university-eligiable-courses-selector-container">
        <BlackSelector
          options={courses}
          set={courses[0]}
          onSet={(value) => {
            handleOptionChange(value);
          }}
        />
        <BlackSelector
          options={Offer}
          set={Offer[0]}
          onSet={(value) => {
            handleOptionChange(value);
          }}
        />
      </div>
      <div className="university-eligiable-courses-cards">
        {eligibleCourses.map((course, index) => (
          <div className="university-eligiable-courses-card">
            <div className="university-eligiable-courses-assigners">
              <span key={index}>{course.title}</span>
            </div>
            <div className="university-eligiable-coursess-keys">
              <div className="university-eligiable-courses-keys">
                <span key={index} className="card-number">
                  {course.university}
                </span>
                {course.fee && <span> Fee : ${course.fee}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalBase
        title="Add Course"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <AddCourse closeModal={closeModal} handleChange={handleChange} />
      </ModalBase>
    </div>
  );
}

export default UniversityEligible;
