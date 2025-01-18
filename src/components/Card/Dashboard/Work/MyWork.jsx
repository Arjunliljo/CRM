import Mover from "../../../../features/Mover";
import ArrowBlue from "../../../buttons/ArrowBlue";
import CIrclePlus from "../../../buttons/CIrclePlus";
import HomeIcon from "../../../utils/Icons/HomeIcon";
import MyWorkItem from "./MyWorkItem";

export default function MyWork() {
  const data = [
    {
      name: "Arun Kumar",
      id: "102156 UK",
      program: "Master Of Technology in Information Technology",
      status: "Verification failed, Submit documents before 12 March",
      date: "12 Feb",
      time: "11am",
      color: "green",
    },
    {
      name: "Arun Kumar",
      id: "102156 UK",
      program: "Master Of Technology in Information Technology",
      status: "Verification failed, Submit documents before 12 March",
      date: "12 Feb",
      time: "11am",
      color: "blue",
    },
    {
      name: "Arun Kumar",
      id: "102156 UK",
      program: "Master Of Technology in Information Technology",
      status: "Verification failed, Submit documents before 12 March",
      date: "12 Feb",
      time: "11am",
      color: "green",
    },
    {
      name: "Arun Kumar",
      id: "102156 UK",
      program: "Master Of Technology in Information Technology",
      status: "Verification failed, Submit documents before 12 March",
      date: "12 Feb",
      time: "11am",
      color: "blue",
    },
    {
      name: "Arun Kumar",
      id: "102156 UK",
      program: "Master Of Technology in Information Technology",
      status: "Verification failed, Submit documents before 12 March",
      date: "12 Feb",
      time: "11am",
      color: "blue",
    },
    {
      name: "Arun Kumar",
      id: "102156 UK",
      program: "Master Of Technology in Information Technology",
      status: "Verification failed, Submit documents before 12 March",
      date: "12 Feb",
      time: "11am",
      color: "blue",
    },
  ];

  return (
    <div className="dashboard-card">
      <header>
        <h1>My Work</h1>
        <CIrclePlus>
          <HomeIcon
            path="plus"
            color="#000000f8"
            style={{ transform: "rotate(270deg)" }}
          />
        </CIrclePlus>
      </header>
      <div className="dashboard-card-search-bar">
        <div className="search-input-container">
          <span className="search-icon">
            <HomeIcon path="search" color="#fffffff8" />
          </span>
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="work-items">
        {data.map((item, index) => (
          <MyWorkItem key={index} index={index} item={item} />
        ))}
      </div>
    </div>
  );
}
