import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import { setAutoLeadsAssign, setCurLead } from "../../../global/leadsSlice";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import { useState } from "react";
import { Button } from "antd";
import ModalBase from "../../components/Modals/ModalBase";
import AddLead from "../../components/Modals/ModalComponents/AddLead";

const lead = {
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
  const obj = { ...lead, _id: i };
  return obj;
});

export default function Leads() {
  const { autoLeadsAssign, curLead } = useSelector((state) => state.leads);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen(val => !val)
  }

  const ISearchBar = <SearchBar />;
  const IAutoBtn = <AutoBtn />;
  const IContents = arr?.map((lead, index) => (
    <LeadCard
      key={index}
      onSet={setCurLead}
      set={curLead}
      lead={lead}
      istoggle={autoLeadsAssign}
      toggle={setAutoLeadsAssign}
    />
  ));

  const ISelector = <Selector />;

  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>
      Add Leads
    </PrimaryBttn>
  );

  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector />;
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
  const IProfileCard = <ProfileCard IDocumentUpload={IDocumentUpload} />;

  return (
    <>
      <MainBody
        TopLeft={TopLeft}
        TopRight={TopRight}
        IContents={IContents}
        switching={autoLeadsAssign}
        BottomLeft={BottomLeft}
        BottomRight={BottomRight}
        ProfileCard={IProfileCard}
        StartApplication={IStartApplication}
      />

      {/* Modal for adding a leads */}
      <ModalBase title="Add Lead" isOpen={isModalOpen} closeModal={closeModal}>
        <AddLead closeModal={closeModal} />
      </ModalBase>
    </>
  );
}
