import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import UserCard from "../../components/Card/UserCard";
import {
  setAutoUserAssign,
  setCurUser,
  setUserCurRole,
  setUserCurBranch,
  setUserCurCountry,
} from "../../../global/userSlice";
import All from "../../components/buttons/All";
import UserRight from "../../components/Card/UserRight/UserRight";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/apiContext/ApiContext";
import {
  useIDGetBranchesArray,
  useIDGetCountriesArray,
  useIDGetRolesArray,
} from "../../../api/Utilities/helper";

export default function User() {
  const { autoUserAssign, curUser, curCountry, curRole, curBranch } =
    useSelector((state) => state.user);
  const authUser = useSelector((state) => state.auth.user);

  const { usersConfigs, roleConfigs, branchConfigs, countryConfigs } = useApi();
  const { users = [] } = usersConfigs;
  const { roles = [] } = roleConfigs;
  const { branches = [] } = branchConfigs;
  const { countries = [] } = countryConfigs;

  const rolesObj = useIDGetRolesArray(roles);
  const branchesObj = useIDGetBranchesArray(branches);
  const countriesObj = useIDGetCountriesArray(countries);

  const navigate = useNavigate();
  const ISearchBar = <SearchBar />;

  const IContents = users
    .filter((user) => user._id !== authUser._id)
    .map((user, index) => (
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
    <PrimaryBttn onClick={() => navigate("/profile-edit")}>
      Add User
    </PrimaryBttn>
  );
  const IAll = <All />;
  const ISelectorOne = (
    <Selector
      optionsObj={rolesObj}
      placeholder="Select Role"
      onSet={setUserCurRole}
      set={curRole}
    />
  );
  const ISelectorTwo = (
    <Selector
      optionsObj={branchesObj}
      placeholder="Select Branch"
      onSet={setUserCurBranch}
      set={curBranch}
    />
  );
  const ISelectorThree = (
    <Selector
      optionsObj={countriesObj}
      placeholder="Select Country"
      onSet={setUserCurCountry}
      set={curCountry}
    />
  );
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
