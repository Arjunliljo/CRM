import BodyBg from "./components/utils/BodyBg";
import Mainhead from "./layout/Mainhead";
import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

function App() {
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
