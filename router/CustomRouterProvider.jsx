import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useSelector } from "react-redux";

export default function CustomRouterProvider() {
  const { user } = useSelector((state) => state.auth);
  return <RouterProvider router={router(user?.tabs)} />;
}
