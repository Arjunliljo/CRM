import { useEffect } from "react";
import BodyBg from "./components/utils/BodyBg";
import Mainhead from "./layout/Mainhead";
import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyUser } from "../global/authSlice";
import { useVerify } from "./hooks/useVerify";

function App() {
  const dispatch = useDispatch();

  useVerify();

  return (
    <div className="App">
      <Mainhead />
      <BodyBg isRotate={false} />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
