import AutoBtn from "../../components/buttons/AutoBtn";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import NormalButton from "../../components/buttons/NormalButton";
import { setCurPayment } from "../../../global/paymentsSlice";

const payment = {
  num: 3,
  name: "John Doe",
  img: "https://via.placeholder.com/150",
  number: 1234567890,
  status: "Interested",
  statusColor: "red",
  remark:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  applications: 2,
  attempts: 1,
  country: "Germany",
  count: 3,
};
const arr = [...Array(500)].map((_, i) => {
  const obj = { ...payment, _id: i };
  return obj;
});

export default function Payments() {
  const { autoPaymentsAssign, curPayment } = useSelector(
    (state) => state.payments
  );

  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = (
  //     <AutoBtn onSet={setAutoOfferlettersAssign} set={autoOfferlettersAssign} />
  //   );
  const IContents = arr?.map((payment, index) => (
    <Payments
      key={index}
      onSet={setCurPayment}
      set={curPayment}
      payment={payment}
    />
  ));

  const ISelector = <Selector />;
  const IAssignBttn = <NormalButton>Assign</NormalButton>;
  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const ISelectorFour = <Selector />;
  const ISelectorFive = <Selector />;
  const IProfileCard = <ProfileCard />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    // <div key="auto-btn">{IAutoBtn}</div>,
    // <div key="selector">{ISelector}</div>,
  ];
  const TopRight = [<div key="primary-btn">{IAssignBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAllLeads}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [
    <div key="selector-four">{ISelectorFour}</div>,
    <div key="selector-five">{ISelectorFive}</div>,
  ];

  return (
    <MainBody
      TopLeft={TopLeft}
      TopRight={TopRight}
      IContents={IContents}
      switching={autoPaymentsAssign}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
