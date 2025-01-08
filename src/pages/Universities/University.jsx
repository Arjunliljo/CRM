import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import { setCurStudent } from "../../../global/studentsSlice";
import StudentsCard from "../../components/Card/StudentsCard";
import All from "../../components/buttons/All";
import { setCurUniversity } from "../../../global/universitySlice";
import UniversityCard from "../../components/Card/UniversityCard";

const university = {
  num: 3,
  Uname: "University of United Kingdom",
  img: "https://via.placeholder.com/150",
  number: 1234567890,
  status: "Interested",
  statusColor: "red",
  remark:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  year: 2,
  fee: 1000,
  eligibility: "Eligibility",
  country: "Germany",
  count: 3,
};
const arr = [...Array(500)].map((_, i) => {
  const obj = { ...university, _id: i };
  return obj;
});

export default function University() {
  const { autoUniversitysAssign, curUniversity } = useSelector(
    (state) => state.universitys
  );

  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = arr?.map((university, index) => (
    <UniversityCard
      key={index}
      onSet={setCurUniversity}
      set={curUniversity}
      university={university}
    />
  ));

  //   const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add Students</PrimaryBttn>;
  const IAll = <All />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const IProfileCard = <ProfileCard />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [<div key="search-bar">{ISearchBar}</div>];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAll}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [
    // <div key="selector-four">{ISelectorFour}</div>,
    // <div key="selector-five">{ISelectorFive}</div>,
  ];

  return (
    <MainBody
      TopLeft={TopLeft}
      TopRight={TopRight}
      IContents={IContents}
      switching={autoUniversitysAssign}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
