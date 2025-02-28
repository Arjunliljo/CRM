import { useState } from "react";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import BlackSelector from "../../Selectors/BlackSelector";
import ModalBase from "../../Forms/ModalBase";
import AddCourse from "./AddCourse";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";
import { refetchUniversity } from "../../../apiHooks/useUniversity";
import { useSelector } from "react-redux";

function UniversityEligible({ coursess }) {
  const Countries = ["Country", "Option 2", "Option 3"];
  const courses = ["UG", "Option 2", "Option 3"];
  const Offer = ["Fees", "Option 2", "Option 3"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { curUniversity } = useSelector((state) => state.universitys);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (courseData) => {
    // closeModal();
    if (!course.name) {
      message.error("Please fill in the branch name");
      return;
    }

    try {
      setIsLoading(true);
      const newCourse = await apiClient.post("/university/course", {
        name: course.name,
        university: curUniversity?._id,
        fee: course.fee || 0,
        duration: course.duration || 0,
        qualification: courseData.qualification,
      });

      const response = await apiClient.patch(
        `/university/${curUniversity._id}`,
        {
          courses: [...curUniversity.courses, newCourse?.data?.data?._id],
        }
      );

      setCourse({ name: "" });
      refetchUniversity();
      message.success("Course created successfully!");
      closeModal();
    } catch (e) {
      message.error("Error creating course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          options={Offer}
          set={Offer[0]}
          onSet={(value) => {
            handleOptionChange(value);
          }}
        />
      </div>
      <div className="university-eligiable-courses-cards">
        {curUniversity?.courses?.map((course, index) => (
          <div className="university-eligiable-courses-card" key={index}>
            <div className="university-eligiable-courses-assigners">
              <span>{course.name}</span>
            </div>
            <div className="university-eligiable-coursess-keys">
              <div className="university-eligiable-courses-keys">
                <span className="card-number">{curUniversity?.name}</span>
                {course.fee && <span> Fee : ${course.fee}</span>}
              </div>
            </div>
            <div
              className="eligiable-courses-assigners"
              style={{ textAlign: "right" }}
            >
              <span>
                {course.duration ? ` ${course.duration} Months` : "null"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ModalBase
        title="Add Course"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <AddCourse
          closeModal={closeModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          course={course}
          setCourse={setCourse}
        />
      </ModalBase>
    </div>
  );
}

export default UniversityEligible;
