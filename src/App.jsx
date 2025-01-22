import BodyBg from "./components/utils/BodyBg";
import Mainhead from "./layout/Mainhead";
import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";
import { useApi } from "./context/apiContext/ApiContext.jsx";
import { useSelector } from "react-redux";

function App() {
  const { branchConfigs } = useApi();
  const { branchNames } = useSelector((state) => state.core);

  console.log(branchConfigs.branches);

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
