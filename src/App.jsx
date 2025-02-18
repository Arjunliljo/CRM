import BodyBg from "./components/utils/BodyBg";
import { useVerify } from "./hooks/useVerify";
import Mainhead from "./layout/Mainhead";
import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

function App() {
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
