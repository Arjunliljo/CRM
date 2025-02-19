import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import {
  setAutoLeadsAssign,
  setCurLead,
  setLeadDetailToggle,
} from "../../../global/leadsSlice";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import { useState } from "react";
import ModalBase from "../../components/Forms/ModalBase";
import AddLead from "../../components/Forms/Leads/AddLead";
import { useIDGetStatuses } from "../../../api/Utilities/helper";
import { useApi } from "../../context/apiContext/ApiContext";

export default function Leads() {
  const { autoLeadsAssign, curLead, leadDetailToggle } = useSelector(
    (state) => state.leads
  );

  const { leadsConfigs } = useApi();

  const statusObj = useIDGetStatuses("obj");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const [newLead, setNewLead] = useState({
    name: "",
    DOM: "",
    Contact: "",
    Whatsupp: "",
    Mail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ISearchBar = <SearchBar />;
  const IAutoBtn = <AutoBtn />;
  const IContents = leadsConfigs?.leads?.map((lead, index) => (
    <LeadCard
      key={index}
      onSet={setCurLead}
      set={curLead}
      lead={lead}
      istoggle={leadDetailToggle}
      toggle={setLeadDetailToggle}
    />
  ));

  const ISelector = <Selector />;

  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>Add Leads</PrimaryBttn>
  );

  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector optionsObj={statusObj} />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const ISelectorFour = <Selector />;
  const ISelectorFive = <Selector />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    <div key="auto-btn">{IAutoBtn}</div>,
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

  const IDocumentUpload = <DocumentUpload />;
  const IProfileCard = (
    <ProfileCard IDocumentUpload={IDocumentUpload} lead={curLead} />
  );

  return (
    <>
      <MainBody
        TopLeft={TopLeft}
        TopRight={TopRight}
        IContents={IContents}
        switching={leadDetailToggle}
        BottomLeft={BottomLeft}
        BottomRight={BottomRight}
        ProfileCard={IProfileCard}
        StartApplication={IStartApplication}
      />

      <ModalBase title="Add Lead" isOpen={isModalOpen} closeModal={closeModal}>
        <AddLead
          closeModal={closeModal}
          newLead={newLead}
          setNewLead={setNewLead}
          handleChange={handleChange}
        />
      </ModalBase>
    </>
  );
}
