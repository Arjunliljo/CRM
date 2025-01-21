import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";

export default function Navbar() {
  return (
    <nav className="navbar">
      <li>
        <NavLink to="/dash">
          <HomeIcon path="home" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/leads">
          <HomeIcon path="hat" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/branchmanaging">
          <HomeIcon path="group" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <HomeIcon path="doc" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/university">
          <HomeIcon path="tick" />
        </NavLink>
      </li>
      <li>
        <NavLink to="">
          <HomeIcon path="wifi" />
        </NavLink>
      </li>
      <li>
        <NavLink to="profileEdit">
          <HomeIcon path="contact" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-profile">
          <HomeIcon path="settings" />
        </NavLink>
      </li>
    </nav>
  );
}
