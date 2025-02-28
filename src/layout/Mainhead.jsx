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

    const morningGreetings = [
      "Good morning! Have a great day!",
      "Rise and shine!",
      "Feeling fresh today?",
      "Hope you slept well!",
      "Let’s make today amazing!",
      "Morning! What's the plan?"
    ];

    const afternoonGreetings = [
      "Good afternoon! Keep going strong!",
      "Hope your day’s smooth!",
      "Feeling productive today?",
      "Enjoy your afternoon!",
      "You're doing great!",
      "Need a quick break?"
    ];

    const eveningGreetings = [
      "Good evening! Relax and unwind.",
      "Time to slow down!",
      "Had a good day?",
      "Evening! Enjoy the moment.",
      "Rest up for tomorrow!",
      "How’s your night going?"
    ];


    if (hour < 12) {
      return morningGreetings[Math.floor(Math.random() * morningGreetings.length)];
    } else if (hour < 18) {
      return afternoonGreetings[Math.floor(Math.random() * afternoonGreetings.length)];
    } else {
      return eveningGreetings[Math.floor(Math.random() * eveningGreetings.length)];
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
