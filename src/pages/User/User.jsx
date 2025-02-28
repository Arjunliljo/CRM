import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import UserCard from "../../components/Card/UserCard";
import { setAutoUserAssign, setCurUser } from "../../../global/userSlice";
import All from "../../components/buttons/All";
import UserRight from "../../components/Card/UserRight/UserRight";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { autoUserAssign, curUser } = useSelector((state) => state.user);

  const { users } = useSelector((state) => state.users);

  console.log(users, "users");

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/profile-edit");
  };
  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = users?.map((user, index) => (
    <UserCard
      key={index}
      onSet={setCurUser}
      set={curUser}
      user={user}
      istoggle={autoUserAssign}
      toggle={setAutoUserAssign}
    />
  ));

  //   const ISelector = <Selector />;
  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleNavigate}>Add User</PrimaryBttn>
  );
  const IAll = <All />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const IProfileCard = <UserRight user={curUser} />;


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
      switching={autoUserAssign}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
    />
  );
}
