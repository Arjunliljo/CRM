import NormalButton from "../../buttons/NormalButton";
import BlackSelector from "../../Selectors/BlackSelector";
import EligibleBttn from "../../buttons/EligibleBttn";
import React, { useState, useEffect, useRef } from "react";

export default function EligiableCourses({onCourseClick}) {
  const Countries = ["Country", "Option 2", "Option 3"];
  const courses = ["UG", "Option 2", "Option 3"];
  const Offer = ["Fees", "Option 2", "Option 3"];

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const cardRef = useRef(null);

  const handleOptionChange = (newOption) => {
    console.log("Selected Option:", newOption);
  };

  const eligibleCourses = [
    {
      _id: "ec1",
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: "2000",
    },
    {
      _id: "ec2",
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      _id: "ec3",
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      _id: "ec4",
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      _id: "ec5",
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
    {
      _id: "ec6",
      title: "Masters in Advanced Artificial Intelligence",
      university: "University of UK, UK",
      fee: null,
    },
  ];

  const qualifications = [
    {
      qualification: "Degree",
      score: "80%",
      institution: "MGU",
    },
    {
      qualification: "Plus Two",
      score: "75%",
      institution: "Kerala State",
    },
    {
      qualification: "Tenth",
      score: "80%",
      institution: "CBSE",
    },
    {
      qualification: "IELTS",
      score: "8.5",
      institution: null,
    },
  ];

  const handleCardClick = (courseId) => {
    const newSelectedId = selectedCourseId === courseId ? null : courseId;
    setSelectedCourseId(newSelectedId);
    console.log("courseId", courseId);
    onCourseClick(newSelectedId);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (cardRef.current && !cardRef.current.contains(event.target)) {
  //       setSelectedCourseId(null);
  //       onClick(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="eligiable-courses" ref={cardRef}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="name-small">Eligible Courses</span>
      </div>

      <div className="eligiable-courses-qualifications">
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
      </div>

      <div className="eligiable-courses-selector-container">
        <BlackSelector
          options={Countries}
          set={Countries[0]}
          onSet={(value) => {
            handleOptionChange(value);
          }}
        />
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

      <div className="eligiable-courses-cards">
        {eligibleCourses.map((course, index) => (
          <div
            className={`eligiable-courses-card ${
              selectedCourseId === course._id ? "selected" : ""
            }`}
            key={course._id}
            onClick={() => handleCardClick(course._id)}
            style={{
              backgroundColor: selectedCourseId === course._id ? "rgb(216, 255, 216)" : "lightgrey",
              border: selectedCourseId === course._id ? "1px solid #0075fc" : "none",
            }}
          >
            <div className="eligiable-courses-assigners">
              <span>{course.title}</span>
            </div>
            <div className="eligiable-courses-keys">
              <span className="card-number">{course.university}</span>
              {course.fee && <span> Fee : ${course.fee}</span>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
