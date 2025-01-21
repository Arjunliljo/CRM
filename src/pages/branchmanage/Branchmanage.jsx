import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";

import All from "../../components/buttons/All";
import Counsellor from "../../components/buttons/NormalButton";
import NormalButton from "../../components/buttons/NormalButton";
import {
  setAutoBranchmanageAssign,
  setCurBranchmanage,
} from "../../../global/branchSlice";
import BranchManagingCard from "../../components/Card/BranchManagingCard";

const branchmanage = {
  num: 3,
  name: "John Doe",
  img: "https://via.placeholder.com/150",
  number: 1234567890,
  status: "Interested",
  statusColor: "red",
  remark:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  applications: "8 Payments",
  payments: 5,
  ongoing: "88 ongoing",
  state: "Kochi",
  count: 3,
};
const arr = [...Array(500)].map((_, i) => {
  const obj = { ...branchmanage, _id: i };
  return obj;
});

export default function Branchmanage() {
  const { autoBranchmanageAssign, curBranchmanage } = useSelector(
    (state) => state.branchmanage
  );

  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = arr?.map((branchmanage, index) => (
    <BranchManagingCard
      key={index}
      onSet={setCurBranchmanage}
      set={curBranchmanage}
      branchmanage={branchmanage}
      istoggle={autoBranchmanageAssign}
      toggle={setAutoBranchmanageAssign}
    />
  ));

  //   const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add User</PrimaryBttn>;
  const IAll = <All />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const IProfileCard = <ProfileCard />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    // <div key="auto-btn">{IAutoBtn}</div>,
    // <div key="selector">{ISelector}</div>,
  ];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all">{IAll}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [];

  return (
    <MainBody
      TopLeft={TopLeft}
      TopRight={TopRight}
      IContents={IContents}
      switching={autoBranchmanageAssign}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
