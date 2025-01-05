import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import { setAutoLeadsAssign } from "../../../global/generalSlice";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";

export default function Leads() {
  const { autoLeadsAssign } = useSelector((state) => state.general);

  const arr = [...Array(50)];

  const ISearchBar = <SearchBar />;
  const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = arr?.map((_, index) => <LeadCard key={index} />);
  const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn />;
  const TopLeft = [ISearchBar, IAutoBtn, ISelector];
  const TopRight = [IPrimaryBttn];
  return (
    <MainBody
      TopLeft={TopLeft}
      TopRight={TopRight}
      IContents={IContents}
      switching={autoLeadsAssign}
    />
  );
}

// import AutoBtn from "../../components/buttons/AutoBtn";
// import LeadCard from "../../components/Card/LeadCard";
// import SearchBar from "../../components/smallComponents/SearchBar";
// import { useSelector } from "react-redux";
// import { setAutoLeadsAssign } from "../../../global/generalSlice";

// export default function Leads() {
//   const { autoLeadsAssign } = useSelector((state) => state.general);

//   const arr = [...Array(50)];

//   return (
//     <main className="main-body leads">
//       <div className="main-body-head">
//         <div className="main-body-head-left">
//           <div className="main-body-head-left-top">
//             <SearchBar />
//             <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />
//           </div>
//           <div className="main-body-head-left-bottom"></div>
//         </div>
//       </div>
//       <div className="main-body-box">
//         <div
//           className={`main-body-box-left`}
//           style={autoLeadsAssign ? { width: "50%" } : { width: "100%" }}
//         >
//           <div className="main-body-scroll-container">
//             {arr?.map((_, index) => (
//               <LeadCard key={index} />
//             ))}
//           </div>
//         </div>
//         <div
//           className="main-body-box-right"
//           style={autoLeadsAssign ? { width: "50%" } : { width: "0%" }}
//         ></div>
//       </div>
//     </main>
//   );
// }
