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
import {
  setAutoUniversitysAssign,
  setCurUniversity,
} from "../../../global/universitySlice";
import UniversityCard from "../../components/Card/UniversityCard";
import UniversityProfile from "../../components/Card/UniversityRight/UniversityProfile";
import ModalBase from "../../components/Forms/ModalBase";
import { useState } from "react";
import AddUniversity from "../../components/Forms/University/AddUniversity";

const university = {
  num: 3,
  Uname: "University Of United Kingdom",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const [newUniversity, setNewUniversity] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUniversity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = arr?.map((university, index) => (
    <UniversityCard
      key={index}
      onSet={setCurUniversity}
      set={curUniversity}
      university={university}
      istoggle={autoUniversitysAssign}
      toggle={setAutoUniversitysAssign}
    />
  ));

  //   const ISelector = <Selector />;
  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>Add University</PrimaryBttn>
  );
  const IAll = <All />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const IProfileCard = <UniversityProfile />;

  const TopLeft = [<div key="search-bar">{ISelectorOne}</div>];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAll}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [
    <div key="search-bar">{ISearchBar}</div>,
    // <div key="selector-five">{ISelectorFive}</div>,
  ];

  return (
    <>
      <MainBody
        TopLeft={TopLeft}
        TopRight={TopRight}
        IContents={IContents}
        switching={autoUniversitysAssign}
        BottomLeft={BottomLeft}
        BottomRight={BottomRight}
        ProfileCard={IProfileCard}
      />
      <ModalBase
        title="Add University"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <AddUniversity
          closeModal={closeModal}
          newUniversity={newUniversity}
          setNewUniversity={setNewUniversity}
          handleChange={handleChange}
        />
      </ModalBase>
    </>
  );
}
