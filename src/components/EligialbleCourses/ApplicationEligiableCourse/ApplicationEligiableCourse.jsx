import { useEffect, useRef, useState } from "react";
import { useCourses } from "../../Card/ProfileCard/hooks/useCourses";
import { getCountryId, getUniversityId } from "../../../service/IdFinders";
import BlackSelector from "../../Selectors/BlackSelector";
import {
  getCountryName,
  getUniversityName,
} from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";
import ApplicationCoursesComponent from "./ApplicationCoursesComponent";

export default function ApplicationEligiableCourse({ onClick, application }) {
  const { countryConfigs, universityConfigs } = useApi();
  const { countries = [] } = countryConfigs;
  const { university = [] } = universityConfigs;
  const countryNames = countries?.map((obj) => obj?.name);
  const universityNames = university?.map((obj) => obj?.name);

  const [curCountry, setCurCountry] = useState("All Countries");
  const [curUniversity, setCurUniversity] = useState("All Universities");

  const [selectedCourseId, setSelectedCourseId] = useState(application?.course);
  const cardRef = useRef(null);

  const { courses, isLoading, error, refetch } = useCourses(
    getCountryId(curCountry, countries) || "All Countries",
    getUniversityId(curUniversity, university) || "All Universities"
  );

  useEffect(() => {
    setCurCountry(getCountryName(application?.country, countries));
    setCurUniversity(getUniversityName(application?.university, university));
    setSelectedCourseId(application?.course);
  }, [application, countries, university]);

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
    <>
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
        </div>

        <div className="eligiable-courses-cards">
          {courses?.length > 0 ? (
            courses.map((course, index) => (
              <ApplicationCoursesComponent
                key={course._id}
                course={course}
                university={university}
                selectedCourseId={selectedCourseId}
                handleCardClick={handleCardClick}
              />
            ))
          ) : (
            <div>No courses available</div>
          )}
        </div>
      </div>
    </>
  );
}
