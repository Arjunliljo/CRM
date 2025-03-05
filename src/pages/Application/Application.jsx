import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import ApplicationCard from "../../components/Card/ApplicationCard";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import {
  setApplicationDetailToggle,
  setCurApplication,
} from "../../../global/applicationSlice";
import { useApi } from "../../context/apiContext/ApiContext";

export default function Application() {
  const { autoGeneralsAssign, curGeneral } = useSelector(
    (state) => state.general
  );

  const { applicationDetailToggle, curApplication } = useSelector(
    (state) => state.applications
  );

  const { applicationsConfigs } = useApi();
  const { applications = [] } = applicationsConfigs;

  const ISearchBar = <SearchBar />;

  const IContents = applications?.map((application, index) => (
    <ApplicationCard
      key={index}
      onSet={setCurApplication}
      set={curApplication}
      application={application}
      istoggle={applicationDetailToggle}
      toggle={setApplicationDetailToggle}
      lead={application?.lead}
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
