import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../src/App";
import Leads from "../src/pages/leads/Leads";
import Profilepage from "../src/pages/ProfilePage/ProfilePage";
import User from "../src/pages/User/User";
import Students from "../src/pages/Students/Students";
import University from "../src/pages/Universities/University";
import ProfileUpdateUser from "../src/pages/profileEdit/ProfileUpdateUser";
import Branchmanage from "../src/pages/branchmanage/Branchmanage";
import Dash from "../src/pages/dashboard/Dash";
import Dependencies from "../src/pages/Dependency/Dependencies";
import Login from "../src/layout/Login/Login";
import General from "../src/pages/general/General";
import UserProfileEdit from "../src/pages/profileEdit/ProfileStatus/userProfileEdit";
import Config from "../src/pages/Config/Config";

const tabses = [
  {
    path: "Dashboard",
    element: <Dash />,
  },
  {
    path: "Leads",
    element: <Leads />,
  },
  {
    path: "Student",
    element: <Students />,
  },

  {
    path: "User",
    element: <User />,
  },
  {
    path: "University",
    element: <University />,
  },
  {
    path: "Configuration",
    element: <Dependencies />,
  },
  {
    path: "Profile-edit",
    element: <ProfileUpdateUser />,
  },

  {
    path: "Sync",
    element: <Config />,
  },
  {
    path: "Profile-card",
    element: <Profilepage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "offerLetter",
    element: <General />,
  },
  {
    path: "User/user-profile-edit",
    element: <UserProfileEdit />,
  },
];

export const router = (tabs) => {
  const dynamicRoutes = tabs?.map((tab) => {
    return {
      path: tab.name,
      element: <General status={tab} />,
    };
  });

  const routes = tabses.concat(dynamicRoutes || []);

  return createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: routes,
    },
  ]);
};
