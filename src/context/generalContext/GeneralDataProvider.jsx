import { useGeneral } from "./GeneralContext";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import { setCurGeneral } from "../../../global/generalSlice";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import MainBody from "../../layout/MainBody/MainBody";
import GeneralCard from "../../components/Card/GeneralCards/GeneralCard";
import GeneralApplicationCard from "../../components/Card/GeneralCards/GeneralApplicationCard";

export default function GeneralDataProvider({ tab }) {
  const { autoGeneralsAssign, curGeneral } = useSelector(
    (state) => state.general
  );

  const { genLeadConfigs } = useGeneral();
  const { data = [] } = genLeadConfigs;

  const ISearchBar = <SearchBar />;

  const IContents = tab?.isApplication
    ? data?.map((application, index) => (
        <GeneralApplicationCard key={index} application={application} />
      ))
    : data?.map((general, index) => (
        <GeneralCard key={index} general={general} />
      ));

  const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add Leads</PrimaryBttn>;
  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector />;
  const ISelectorThree = <Selector />;
  const ISelectorFour = <Selector />;
  const ISelectorFive = <Selector />;
  const IDocumentUpload = <DocumentUpload />;
  const IProfileCard = <ProfileCard IDocumentUpload={IDocumentUpload} />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    <div key="selector">{ISelector}</div>,
  ];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAllLeads}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    // <div key="selector-two">{ISelectorTwo}</div>,
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
      switching={autoGeneralsAssign}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
