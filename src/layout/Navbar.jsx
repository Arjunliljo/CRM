import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";

export default function Navbar() {
  return (
    <nav className="navbar">
      <li className="learn-more">
        <NavLink to="/">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="home" />
          </span>
          <span className="li-text">Dashboard</span>
        </NavLink>
      </li>

      <li className="learn-more">
        <NavLink to="/leads">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="hat" />
          </span>
          <span className="li-text">Leads</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/student">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="group" />
          </span>
          <span className="li-text">Students</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/user">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="doc" />
          </span>
          <span className="li-text">Documents</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/university">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="tick" />
          </span>
          <span className="li-text">University</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/dependencies">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="contact" />
          </span>
          <span className="li-text">Dependencies</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/profileEdit">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="wifi" />
          </span>
          <span className="li-text">Profile</span>
        </NavLink>
      </li>

      <li className="learn-more">
        <NavLink to="/user">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="contact" />
          </span>
          <span className="li-text">Users</span>
        </NavLink>
      </li>
      <li className="learn-more">
        <NavLink to="/settings">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="settings" />
          </span>
          <span className="li-text">Settings</span>
        </NavLink>
      </li>
    </nav>
  );
}
