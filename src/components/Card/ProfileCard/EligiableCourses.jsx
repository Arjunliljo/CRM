import BlackSelector from "../../Selectors/BlackSelector";
import { useState, useRef } from "react";
import { getCountryId, getUniversityId } from "../../../service/IdFinders";
import { getUniversityName } from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";
import { useCourses } from "./hooks/useCourses";


export default function EligiableCourses({ onClick ,qualifications }) {
  const { countryConfigs, universityConfigs } = useApi();
  const { countries = [] } = countryConfigs;
  const { university = [] } = universityConfigs;

  const [curCountry, setCurCountry] = useState("All Countries");
  const [curUniversity, setCurUniversity] = useState("All Universities");

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const cardRef = useRef(null);

  const { courses, isLoading, error, refetch } = useCourses(
    getCountryId(curCountry, countries) || "All Countries",
    getUniversityId(curUniversity, university) || "All Universities"
  );

  const countryNames = countries?.map((obj) => obj?.name);
  const universityNames = university?.map((obj) => obj?.name);

  const handleCardClick = (course) => {
    const courseId = course._id;
    const newSelectedId = selectedCourseId === courseId ? null : courseId;
    setSelectedCourseId(newSelectedId);

    onClick(course);
  };

  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error fetching courses: {error.message}</div>;
  }

  return (
    <div className="eligiable-courses" ref={cardRef}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="name-small" style={{ marginBottom: "1rem" }}>
          Eligible Courses
        </span>
      </div>

      <div className="eligiable-courses-selector-container">
        <BlackSelector
          options={countryNames}
          set={curCountry}
          onSet={setCurCountry}
          placeholder="All Countries"
        />
        <BlackSelector
          options={universityNames}
          set={curUniversity}
          onSet={setCurUniversity}
          placeholder="All Universities"
        />
        {/* <BlackSelector
          options={Offer}
          set={Offer[0]}
          onSet={(value) => {
            handleOptionChange(value);
          }}
        /> */}
      </div>

      <div className="eligiable-courses-cards">
        {courses?.length > 0 ? (
          courses.map((course, index) => (
            <div
              className={`eligiable-courses-card ${
                selectedCourseId === course._id ? "selected" : ""
              }`}
              key={course._id}
              onClick={() => handleCardClick(course)}
              style={{
                backgroundColor:
                  selectedCourseId === course._id
                    ? "rgb(216, 255, 216)"
                    : "lightgrey",
                border:
                  selectedCourseId === course._id
                    ? "1px solid #0075fc"
                    : "none",
              }}
            >
              <div className="eligiable-courses-assigners">
                <span>{course.name || "No Name Available"}</span>
              </div>
              <div className="eligiable-courses-keys">
                <span className="card-number">
                  {getUniversityName(course?.university, university) || "null"}
                </span>
                {course.fee && (
                  <span style={{ color: "black" }}> Fee : ${course.fee}</span>
                )}
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
          ))
        ) : (
          <div>No courses available</div>
        )}
      </div>
    </div>
  );
}
