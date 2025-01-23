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
import {
  setAutoStudentsAssign,
  setCurStudent,
} from "../../../global/studentsSlice";
import StudentsCard from "../../components/Card/StudentsCard";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import ModalBase from "../../components/Modals/ModalBase";
import { useState } from "react";

const student = {
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
  const obj = { ...student, _id: i };
  return obj;
});

export default function Students() {
  const { autoStudentsAssign, curStudent } = useSelector(
    (state) => state.students
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };
  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = arr?.map((student, index) => (
    <StudentsCard
      key={index}
      onSet={setCurStudent}
      set={curStudent}
      student={student}
      istoggle={autoStudentsAssign}
      toggle={setAutoStudentsAssign}
    />
  ));

  //   const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add Students</PrimaryBttn>;
  const IAllLeads = <AllLeads />;
  const IDocumentUpload = <DocumentUpload />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const IProfileCard = <ProfileCard IDocumentUpload={IDocumentUpload} />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [<div key="search-bar">{ISearchBar}</div>];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAllLeads}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [
    // <div key="selector-four">{ISelectorFour}</div>,
    // <div key="selector-five">{ISelectorFive}</div>,
  ];

  return (
    <>
      <MainBody
        TopLeft={TopLeft}
        TopRight={TopRight}
        IContents={IContents}
        switching={autoStudentsAssign}
        BottomLeft={BottomLeft}
        BottomRight={BottomRight}
        ProfileCard={IProfileCard}
        StartApplication={IStartApplication}
      />
      <ModalBase
        title="Add Student"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        {/* <AddStudent closeModal={closeModal} /> */}
      </ModalBase>
    </>
  );
}
