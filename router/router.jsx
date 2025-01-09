import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Leads from "../src/pages/leads/Leads";
import ProfileForm from "../src/pages/ProfilePage/ProfilePage";
import UserCard from "../src/components/Card/UserCard";
import Profilepage from "../src/pages/ProfilePage/ProfilePage";
import User from "../src/pages/User/User";
import Students from "../src/pages/Students/Students";
import University from "../src/pages/Universities/University";
import ProfileEdit from "../src/pages/profileEdit/ProfileUpdateUser";
import ProfileUpdateUser from "../src/pages/profileEdit/ProfileUpdateUser";

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
        path: "user-card",
        element: <UserCard />,
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
        path: "profileEdit",
        element: <ProfileUpdateUser />,
      },
    ],
  },
]);
