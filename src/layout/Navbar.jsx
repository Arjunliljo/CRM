import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";

export default function Navbar() {
  return (
    <nav className="navbar">
      <li>
        <NavLink to="/">
          <HomeIcon path="home" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/leads">
          <HomeIcon path="hat" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/student">
          <HomeIcon path="group" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <HomeIcon path="doc" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/tick">
          <HomeIcon path="tick" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/wifi">
          <HomeIcon path="wifi" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <HomeIcon path="contact" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings">
          <HomeIcon path="settings" />
        </NavLink>
      </li>
    </nav>
  );
}
