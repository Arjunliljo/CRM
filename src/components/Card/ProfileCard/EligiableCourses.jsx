import BlackSelector from "../../Selectors/BlackSelector";

export default function EligiableCourses() {
  const Countries = ["Country", "Option 2", "Option 3"];
  const courses = ["UG", "Option 2", "Option 3"];
  const Offer = ["Fees", "Option 2", "Option 3"];

  const handleOptionChange = (newOption) => {
    console.log("Selected Option:", newOption);
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

  return (
    <div className="eligiable-courses">
      <span className="name-small">Eligible Courses</span>
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
          <div className="eligiable-courses-card">
            <div className="eligiable-courses-assigners">
              <span key={index}>{course.title}</span>
            </div>
            <div className="eligiable-courses-keys">
              <div className="eligiable-courses-keys">
                <span key={index} className="card-number">
                  {course.university}
                </span>
                {course.fee && <span> Fee : ${course.fee}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>  
    </div>
  );
}
