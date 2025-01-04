import AutoBtn from "../../components/buttons/AutoBtn";
import SearchBar from "../../components/smallComponents/SearchBar";

export default function Leads() {
  return (
    <main className="main-body leads">
      <div className="main-body-head">
        <div className="main-body-head-left">
          <div className="main-body-head-left-top">
            <SearchBar />
            <AutoBtn>Auto Assign</AutoBtn>
          </div>
          <div className="main-body-head-left-bottom"></div>
        </div>
      </div>
      <div className="main-body-box"></div>
    </main>
  );
}
