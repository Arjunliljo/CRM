import React from "react";
import { useLocation } from "react-router-dom";
import icon from "./../assets/Icons/mlq-01pro.svg";
import { CiBellOn } from "react-icons/ci";
import profile from "./../assets/profilepic.avif";

function Mainhead() {
  const location = useLocation(); // Access the current route

  // Map routes to their corresponding titles
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/leads":
        return "Leads";
      case "/student":
        return "Students";
      case "/user":
        return "Documents";
      case "/university":
        return "University";
      case "/dependencies":
        return "Dependencies";
      case "/profileEdit":
        return "Profile";
      case "/profileCard":
        return "Settings";
      default:
        return "Page Title";
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="logocontainer">
      <img src={icon} alt="" className="logocontainer-rightlogo" />
      <span className="logocontainer-greeting">{getGreeting()} 👋</span>
      <div className="logocontainer-leftlead">
        <h2>{getPageTitle()}</h2>
        <div className="logocontainer-leftlead-bell">
          <CiBellOn className="logocontainer-leftlead-bell-icon" />
        </div>
        <img src={profile} alt="" className="logocontainer-leftlead-photo" />
      </div>
    </div>
  );
}

export default Mainhead;
