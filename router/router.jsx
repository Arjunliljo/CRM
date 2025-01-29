import { createBrowserRouter } from "react-router-dom";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "Branch-managing",
        element: <Branchmanage />,
      },
      {
        path: "Profile-card",
        element: <Profilepage />,
      },
    ],
  },
]);
