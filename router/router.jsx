import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Leads from "../src/pages/leads/Leads";
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
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
