// import NormalButton from "../../buttons/NormalButton";
// import BlackSelector from "../../Selectors/BlackSelector";
// import EligibleBttn from "../../buttons/EligibleBttn";
// import React, { useState, useEffect, useRef } from "react";
// import apiClient from "../../../../config/axiosInstance";
// import { useQuery } from "@tanstack/react-query";

// export default function EligiableCourses({
//   onClick,
//   qualifications = [
//     {
//       name: "Degree",
//       mark: "80%",
//       institution: "MGU",
//     },
//     {
//       name: "Plus Two",
//       mark: "75%",
//       institution: "Kerala State",
//     },
//     {
//       name: "Tenth",
//       mark: "80%",
//       institution: "CBSE",
//     },
//     {
//       name: "IELTS",
//       mark: "8.5",
//       institution: null,
//     },
//   ],
// }) {
//   const Countries = ["Country", "Option 2", "Option 3"];
//   const coursesOptions = ["UG", "Option 2", "Option 3"];
//   const Offer = ["Fees", "Option 2", "Option 3"];

//   const [selectedCourseId, setSelectedCourseId] = useState(null);

//   const cardRef = useRef(null);

//   const handleOptionChange = (newOption) => {
//     console.log("Selected Option:", newOption);
//   };

//   console.log(qualifications,"qualifications");

//   const eligibleCourses = [
//     {
//       _id: "ec1",
//       title: "Masters in Advanced Artificial Intelligence",
//       university: "University of UK, UK",
//       fee: "2000",
//     },
//     {
//       _id: "ec2",
//       title: "Masters in Advanced Artificial Intelligence",
//       university: "University of UK, UK",
//       fee: null,
//     },
//     {
//       _id: "ec3",
//       title: "Masters in Advanced Artificial Intelligence",
//       university: "University of UK, UK",
//       fee: null,
//     },
//     {
//       _id: "ec4",
//       title: "Masters in Advanced Artificial Intelligence",
//       university: "University of UK, UK",
//       fee: null,
//     },
//     {
//       _id: "ec5",
//       title: "Masters in Advanced Artificial Intelligence",
//       university: "University of UK, UK",
//       fee: null,
//     },
//     {
//       _id: "ec6",
//       title: "Masters in Advanced Artificial Intelligence",
//       university: "University of UK, UK",
//       fee: null,
//     },
//   ];

//   const { data:courses, isLoading, error, refetch } = useQuery({
//     queryKey: ["courses"],
//     queryFn: () => apiClient.get("/university/course"),
//   });

//   console.log(courses.data.data, "courses");

//   const handleCardClick = (courseId) => {
//     const newSelectedId = selectedCourseId === courseId ? null : courseId;
//     setSelectedCourseId(newSelectedId);

//     onClick(newSelectedId);
//   };

//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (cardRef.current && !cardRef.current.contains(event.target)) {
//   //       setSelectedCourseId(null);
//   //       onClick(null);
//   //     }
//   //   };

//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, []);

//   return (
//     <div className="eligiable-courses" ref={cardRef}>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <span className="name-small">Eligible Courses</span>
//       </div>

//       <div className="eligiable-courses-qualifications">
//         <div className="card-number profileCard-head-info-keys">
//           {qualifications.map((item, index) => (
//             <span key={index}>{item.name}</span>
//           ))}
//         </div>
//         <div className="profileCard-head-info-assigners">
//           {qualifications.map((item, index) => (
//             <span key={index}>
//               {item.mark} {item.institution && item.institution}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="eligiable-courses-selector-container">
//         <BlackSelector
//           options={Countries}
//           set={Countries[0]}
//           onSet={(value) => {
//             handleOptionChange(value);
//           }}
//         />
//         <BlackSelector
//           options={coursesOptions}
//           set={coursesOptions[0]}
//           onSet={(value) => {
//             handleOptionChange(value);
//           }}
//         />
//         <BlackSelector
//           options={Offer}
//           set={Offer[0]}
//           onSet={(value) => {
//             handleOptionChange(value);
//           }}
//         />
//       </div>

//       <div className="eligiable-courses-cards">
//         {courses?.data?.data?.map((course, index) => (
//           <div
//             className={`eligiable-courses-card ${
//               selectedCourseId === course._id ? "selected" : ""
//             }`}
//             key={course._id}
//             onClick={() => handleCardClick(course._id)}
//             style={{
//               backgroundColor:
//                 selectedCourseId === course._id
//                   ? "rgb(216, 255, 216)"
//                   : "lightgrey",
//               border:
//                 selectedCourseId === course._id ? "1px solid #0075fc" : "none",
//             }}
//           >
//             <div className="eligiable-courses-assigners">
//               <span>{course.name || "No Name Available"}</span>
//             </div>
//             <div className="eligiable-courses-keys">
//               <span className="card-number">
//                 {course.university.map((item) => item.name).join(", ") || " "}
//               </span>
//               {course.fee && <span style={{color: 'black'}}> Fee : ${course.fee}</span>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import NormalButton from "../../buttons/NormalButton";
import BlackSelector from "../../Selectors/BlackSelector";
import EligibleBttn from "../../buttons/EligibleBttn";
import React, { useState, useEffect, useRef } from "react";
import apiClient from "../../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function EligiableCourses({
  onClick,
  qualifications = [
    {
      name: "Degree",
      mark: "80%",
      institution: "MGU",
    },
    {
      name: "Plus Two",
      mark: "75%",
      institution: "Kerala State",
    },
    {
      name: "Tenth",
      mark: "80%",
      institution: "CBSE",
    },
    {
      name: "IELTS",
      mark: "8.5",
      institution: null,
    },
  ],
}) {
  const Countries = ["Country", "Option 2", "Option 3"];
  const coursesOptions = ["UG", "Option 2", "Option 3"];
  const Offer = ["Fees", "Option 2", "Option 3"];

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const cardRef = useRef(null);

  const handleOptionChange = (newOption) => {
    console.log("Selected Option:", newOption);
  };

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => apiClient.get("/university/course"),
  });

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
        <span className="name-small">Eligible Courses</span>
      </div>

      <div className="eligiable-courses-qualifications">
        <div className="card-number profileCard-head-info-keys">
          {qualifications.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
        <div className="profileCard-head-info-assigners">
          {qualifications.map((item, index) => (
            <span key={index}>
              {item.mark} {item.institution && item.institution}
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
          options={coursesOptions}
          set={coursesOptions[0]}
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
        {courses?.data?.data?.length > 0 ? (
          courses.data.data.map((course, index) => (
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
                  {course.university?.map((item) => item.name).join(", ") ||
                    "No University Available"}
                </span>
                {course.fee && (
                  <span style={{ color: "black" }}> Fee : ${course.fee}</span>
                )}
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
