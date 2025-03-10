import { useState } from "react";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import BlackSelector from "../../Selectors/BlackSelector";
import ModalBase from "../../Forms/ModalBase";
import AddCourse from "./AddCourse";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@mui/icons-material";
import UpdateCourse from "./UpdateCourse";
import { updateCurUniversityCourses } from "../../../../global/universitySlice";
import { refetchUniversity } from "../../../apiHooks/universityHooks/useUniversity";

function UniversityEligible() {
  const Offer = ["Fees", "Option 2", "Option 3"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { curUniversity } = useSelector((state) => state.university);

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

      // setCourse({ name: "" });
      dispatch(
        updateCurUniversityCourses([
          ...curUniversity.courses,
          newCourse?.data?.data,
        ])
      );
      refetchUniversity();
      message.success("Course created successfully!");
      closeModal();
    } catch (e) {
      message.error("Error creating course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (courseData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.patch(
        `/university/course/${editCourse._id}`,
        courseData
      );

      message.success("Course updated successfully!");
      closeEditModal();
      refetchUniversity();
      dispatch(
        updateCurUniversityCourses([
          ...curUniversity.courses.filter(
            (course) => course._id !== editCourse._id
          ),
          response.data.data,
        ])
      );
    } catch (e) {
      message.error("Error updating course. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setIsEditModalOpen((val) => !val);
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
          // onSet={(value) => {
          //   handleOptionChange(value);
          // }}
        />
      </div>
      <div className="university-eligiable-courses-cards">
        {curUniversity?.courses && curUniversity?.courses?.length > 0 ? (
          curUniversity.courses.map((course, index) => (
            <div
              className="university-eligiable-courses-card"
              key={course?._id || index}
            >
              <div className="university-eligiable-courses-assigners">
                <span>{course?.name || "Untitled Course"}</span>
              </div>
              <div className="university-eligiable-coursess-keys">
                <div className="university-eligiable-courses-keys">
                  <span className="card-number">
                    {curUniversity?.name || "University Name"}
                  </span>
                  {course?.fee && <span> Fee : ${course.fee}</span>}
                </div>
              </div>
              <div
                className="eligiable-courses-assigners"
                style={{ textAlign: "right" }}
              >
                <span>
                  {course?.duration
                    ? ` ${course.duration} Months`
                    : "Duration not specified"}
                </span>
              </div>
              <div
                className="eligiable-courses-assigners"
                style={{ textAlign: "right" }}
              >
                <div>
                  <span>
                    <EditOutlined
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(course)}
                    />
                  </span>
                </div>
                <div>
                  {/* <span>
                    {course?.duration ? ` ${course.duration} Months` : "null"}
                  </span> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="no-courses-message"
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#666",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              margin: "10px 0",
            }}
          >
            No courses available
          </div>
        )}
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
      <ModalBase
        title="Edit Course"
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
      >
        <UpdateCourse
          closeModal={closeEditModal}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          courseData={editCourse}
          setCourse={setEditCourse}
        />
      </ModalBase>
    </div>
  );
}

export default UniversityEligible;
