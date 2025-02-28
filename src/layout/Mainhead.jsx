import React from "react";
import { useLocation } from "react-router-dom";
import icon from "./../assets/Icons/mlq-01pro.svg";
import { CiBellOn } from "react-icons/ci";
import profile from "./../assets/profilepic.avif";
import { useSelector } from "react-redux";

function Mainhead() {
  const location = useLocation(); // Access the current route
  const user = useSelector((state) => state.auth.user);

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
      return ["Rise and shine!", "Good morning!", "Hope you have a bright morning!"][Math.floor(Math.random() * 3)];
    } else if (hour < 18) {
      return ["Good afternoon!", "Hope your day is going well!", "Enjoy your afternoon!"][Math.floor(Math.random() * 3)];
    } else {
      return ["Good evening!", "Hope you had a great day!", "Relax and unwind this evening!"][Math.floor(Math.random() * 3)];
    }
  };

  return (
    <div className="logocontainer">
      <div className="logocontainer-left">
        <img src={icon} alt="" className="logocontainer-rightlogo" />
        <div className="logocontainer-left-greeting">
          <span className="logocontainer-left-greeting-user ">
            Hi, {user && user.name}.
          </span>
          <span className="logocontainer-left-greeting-text ">
            {getGreeting().toLowerCase()}
          </span>
        </div>
      </div>
      <div className="logocontainer-leftlead">
        <h2>{getPageTitle()}</h2>
        <div className="logocontainer-leftlead-bell">
          <CiBellOn className="logocontainer-leftlead-bell-icon" />
        </div>
        <img
          src={user && user?.image}
          alt=""
          className="logocontainer-leftlead-photo"
        />
      </div>
    </div>
  );
}

export default Mainhead;
