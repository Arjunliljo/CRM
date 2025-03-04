import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import { setCurGeneral } from "../../../global/generalSlice";
import GeneralCard from "../../components/Card/GeneralCard";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import { setCurApplication } from "../../../global/applicationSlice";

const general = {
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
  const obj = { ...general, _id: i };
  return obj;
});

export default function Application() {
  const { autoGeneralsAssign, curGeneral } = useSelector(
    (state) => state.general
  );

  const { applicationDetailToggle, curApplication } = useSelector(
    (state) => state.applications
  );

  const ISearchBar = <SearchBar />;

  const IContents = arr?.map((general, index) => (
    <GeneralCard
      key={index}
      onSet={setCurApplication}
      set={curApplication}
      general={general}
    />
  ));

  const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add Leads</PrimaryBttn>;
  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const ISelectorFour = <Selector />;
  const ISelectorFive = <Selector />;
  const IDocumentUpload = <DocumentUpload />;
  const IProfileCard = <ProfileCard IDocumentUpload={IDocumentUpload} />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    // <div key="auto-btn">{IAutoBtn}</div>,
    <div key="selector">{ISelector}</div>,
  ];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

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
      switching={applicationDetailToggle}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
