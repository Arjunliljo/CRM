import React, { useEffect } from "react";

export default function CourseSelector({
  selectedCourses,
  handleCourseClick,
  newUniversity,
}) {
  const staticCourses = [
    {
      name: "Masters in Advanced Artificial Intelligence",
      fullName: "Data Science",
      code: "AI",
    },
    {
      name: "Masters in Advanced Cybersecurity",
      fullName: "Cybersecurity",
      code: "CS",
    },
    {
      name: "Masters in Advanced AI & Machine Learning",
      fullName: "AI & Machine Learning",
      code: "AI",
    },
    {
      name: "Masters in Advanced Data Science",
      fullName: "Data Science",
      code: "DS",
    },
    {
      name: "Masters in Advanced Graphic Design",
      fullName: "Graphic Design",
      code: "GD",
    },
    {
      name: "Masters in Advanced Cybersecurity",
      fullName: "Cybersecurity",
      code: "CS",
    },
    {
      name: "Masters in Advanced AI & Machine Learning",
      fullName: "AI & Machine Learning",
      code: "AI",
    },
    {
      name: "Masters in Advanced Data Science",
      fullName: "Data Science",
      code: "DS",
    },
  ];

  console.log(newUniversity, "newUniversity");

  useEffect(() => {
    if (newUniversity?.courses?.length > 0) {
      const defaultSelectedCourses = newUniversity.courses
        .map((code) => staticCourses.find((course) => course.code === code))
        .filter(Boolean);
      defaultSelectedCourses.forEach((course) => handleCourseClick(course));
    }
  }, [newUniversity]);

  return (
    <div className="modal__form-course-selector">
      <h2 className="modal__form-course-selector-heading">Select Course</h2>
      <div className="modal__form-course-selector-list">
        {staticCourses.length > 0 ? (
          staticCourses.map((course) => (
            <span
              className={`modal__form-course-selector-list-item ${
                selectedCourses.some((c) => c.name === course.name)
                  ? "active"
                  : ""
              }`}
              key={course.name}
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-name">{course.name}</div>
              <div className="course-full-name">{course.fullName}</div>
              <div className="course-code">{course.code}</div>
            </span>
          ))
        ) : (
          <div className="modal__form-course-selector-no-course">
            No Courses Available
          </div>
        )}
      </div>
    </div>
  );
}
