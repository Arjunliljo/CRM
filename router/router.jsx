import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Leads from "../src/pages/leads/Leads";
import ProfileForm from "../src/pages/ProfilePage/ProfilePage";
import UserCard from "../src/components/Card/UserCard";
import Profilepage from "../src/pages/ProfilePage/ProfilePage";
import User from "../src/pages/User/User";
import Error from "../src/layout/Error";

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
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
