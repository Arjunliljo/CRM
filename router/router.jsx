import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Leads from "../src/pages/leads/Leads";

import Profilepage from "../src/pages/ProfilePage/ProfilePage";
import User from "../src/pages/User/User";
import Students from "../src/pages/Students/Students";
import University from "../src/pages/Universities/University";

import ProfileUpdateUser from "../src/pages/profileEdit/ProfileUpdateUser";

import Branchmanage from "../src/pages/branchmanage/Branchmanage";
import General from "../src/pages/General/General";

import Dash from "../src/pages/dashboard/Dash";
import Dependencies from "../src/pages/Dependency/Dependencies";

const tabs = ["offerletter", "students", "payments"];

const DynamicRoutes = () => {
  return tabs.map((tab) => ({
    path: tab,
    element: <General />,
  }));
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "my-profile",
        element: <Profilepage />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "student",
        element: <Students />,
      },
      {
        path: "university",
        element: <University />,
      },
      {
        path: "dependencies",
        element: <Dependencies />,
      },
      {
        path: "profileEdit",
        element: <ProfileUpdateUser />,
      },
      {
        path: "dash",
        element: <Dash />,
      },
      {
        path: "branchmanaging",
        element: <Branchmanage />,
      },
      {
        path: "profileCard",
        element: <Profilepage />,
      },
      ...DynamicRoutes(),
    ],
  },
]);
