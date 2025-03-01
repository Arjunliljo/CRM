import { getUniversityName } from "../../../../service/nameFinders";

export default function ApplicationCoursesComponent({
  course,
  university,
  selectedCourseId,
  handleCardClick,
}) {
  return (
    <div
      className={`eligiable-courses-card ${
        selectedCourseId === course._id ? "selected" : ""
      }`}
      key={course._id}
      onClick={() => handleCardClick(course)}
      style={{
        backgroundColor:
          selectedCourseId === course._id ? "rgb(216, 255, 216)" : "lightgrey",
        border: selectedCourseId === course._id ? "1px solid #0075fc" : "none",
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
        <span>{course.duration ? ` ${course.duration} Months` : "null"}</span>
      </div>
    </div>
  );
}
