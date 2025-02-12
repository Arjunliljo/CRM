import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";
import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";

export default function Navbar() {
  const logoutUser = useLogout();

  const { defaultTabs=[], tabs=[] } = useSelector((state) => state.auth);
  const userTabs = tabs.map(tab => tab.name);

  const visibleTabs = [...new Set([...defaultTabs, ...userTabs])];

  const navItems = [
    { name: "Dashboard", path: "/Dashboard", icon: "home" },
    { name: "Leads", path: "/Leads", icon: "hat" },
    { name: "Student", path: "/Student", icon: "student" }, 
    { name: "University", path: "/University", icon: "tick" }, 
    { name: "Configuration", path: "/Configuration", icon: "contact" },
    { name: "Profile-edit", path: "/Profile-edit", icon: "wifi" },
    { name: "User", path: "/User", icon: "contact" },
    { name: "Branch-managing", path: "/Branch-managing", icon: "branch" }, 
    { name: "Profile-card", path: "/Profile-card", icon: "settings" },
  ];
  

  return (
    <nav className="navbar">
      {navItems
        .filter(item => visibleTabs.includes(item.name)) 
        .map(item => (
          <li className="learn-more" key={item.name}>
            <NavLink to={item.path}>
              <span className="circle" aria-hidden="true">
                <HomeIcon path={item.icon} />
              </span>
              <span className="li-text">{item.name}</span>
            </NavLink>
          </li>
        ))}

      <li className="learn-more">
        <NavLink to="/User">
          <span className="circle" aria-hidden="true">
            <HomeIcon path="contact" />
          </span>
          <span className="li-text">Users</span>
        </NavLink>
      </li>


      <li className="learn-more">
        <NavLink onClick={logoutUser}>
          <span className="circle" aria-hidden="true">
            <HomeIcon path="logout" />
          </span>
          <span className="li-text">Logout</span>
        </NavLink>
      </li>
    </nav>
  );
}