import { NavLink } from "react-router-dom";
import HomeIcon from "../components/utils/Icons/HomeIcon";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../config/axiosInstance";
import { logout } from "../../global/authSlice";
import { defaultTabs } from "../../api/Data/getData";

export default function Navbar() {
  const dispatch = useDispatch();

  const { defaultTabs: defTabs, tabs } = useSelector((state) => state.auth);
  const sortedDefaultTabs = defaultTabs
    .filter((obj) => defTabs?.includes(obj.name))
    .map((obj) => obj.name);

  const userTabs = tabs.map((tab) => tab.name);

  const visibleTabs = sortedDefaultTabs.filter(
    (tab) => sortedDefaultTabs.includes(tab) || userTabs.includes(tab)
  );

  const availableIcons = [
    "home",
    "hat",
    "group",
    "doc",
    "wifi",
    "camera",
    "contact",
    "trophy",
    "payments",
    "ongoing",
    "stayback",
    "branch",
    "edit",
    "logout",
    "settings",
  ];

  const navItems = visibleTabs.map((tab, i) => ({
    name: tab,
    path: `/${tab}`,
    icon: tab === "Dashboard" ? "home" : availableIcons[i + 1],
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
