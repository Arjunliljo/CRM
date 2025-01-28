import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";

export default function Navbar() {
  return (
    <nav className="navbar">
      <li className="learn-more">
        <NavLink to="/Dashboard">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="home" />
          </span>
          <span className="li-text">Dashboard</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/Leads">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="hat" />
          </span>
          <span className="li-text">Leads</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/Student">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="group" />
          </span>
          <span className="li-text">Students</span>
        </NavLink>
      </li>

      <li className="learn-more">
        <NavLink to="/User">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="tick" />
          </span>
          <span className="li-text">University</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/Configuration">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="contact" />
          </span>
          <span className="li-text">Configuration</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/Profile-edit">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="wifi" />
          </span>
          <span className="li-text">Profile</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/User">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="contact" />
          </span>
          <span className="li-text">Users</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/Profile-card">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="settings" />
          </span>
          <span className="li-text">Settings</span>
        </NavLink>
      </li>
    </nav>
  );
}
