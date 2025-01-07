import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import UserCard from "../../components/Card/UserCard";
import { setCurUser } from "../../../global/userSlice";
import All from "../../components/buttons/All";
import Counsellor from "../../components/buttons/NormalButton";
import NormalButton from "../../components/buttons/NormalButton";

const user = {
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
  const obj = { ...user, _id: i };
  return obj;
});

export default function User() {
  const { autoUserAssign, curUser } = useSelector((state) => state.user);

  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = arr?.map((user, index) => (
    <UserCard key={index} onSet={setCurUser} set={curUser} user={user} />
  ));

  //   const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add User</PrimaryBttn>;
  const IAll = <All />;
  const IButtonOne = <NormalButton>Counsilor</NormalButton>;
  const IButtonTwo = <NormalButton>SRM</NormalButton>;
  const IButtonThree = <NormalButton>Application Team</NormalButton>;
  const IButtonFour = <NormalButton>Visa</NormalButton>;
  const IButtonFive = <NormalButton>Branch Manager</NormalButton>;
  const IButtonSix = <NormalButton>Branch</NormalButton>;
  const IButtonSeven = <NormalButton>Counsilor</NormalButton>;
  const IButtonEight = <NormalButton>Ashwathi</NormalButton>;
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
    <div key="selector-one">{IButtonOne}</div>,
    <div key="selector-two">{IButtonTwo}</div>,
    <div key="selector-three">{IButtonThree}</div>,
    <div key="selector-four">{IButtonFour}</div>,
    <div key="selector-five">{IButtonFive}</div>,
    <div key="selector-six">{IButtonSix}</div>,
  ];
  const BottomRight = [
    <div key="selector-seven">{IButtonSeven}</div>,
    <div key="selector-eight">{IButtonEight}</div>,
  ];

  return (
    <MainBody
      TopLeft={TopLeft}
      TopRight={TopRight}
      IContents={IContents}
      switching={autoUserAssign}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
