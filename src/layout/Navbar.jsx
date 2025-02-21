import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../config/axiosInstance";
import { logout } from "../../global/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const { defaultTabs, tabs } = useSelector((state) => state.auth);

  const userTabs = tabs.map((tab) => tab.name);

  const visibleTabs = [...new Set([...defaultTabs, ...userTabs])];

  const availableIcons = [
    "hat",
    "student",
    "tick",
    "contact",
    "wifi",
    "branch",
    "settings",
  ];

  const navItems = visibleTabs.map((tab) => ({
    name: tab,
    path: `/${tab}`,
    icon:
      tab === "Dashboard"
        ? "home"
        : availableIcons[Math.floor(Math.random() * availableIcons.length)],
  }));

  const logoutUser = async () => {
    await apiClient.post("/user/logout");
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      {navItems.map((item) => (
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
