import SearchBar from "../../components/smallComponents/SearchBar";
import { useDispatch, useSelector } from "react-redux";
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
  setUniversityCurCountry,
} from "../../../global/universitySlice";
import UniversityCard from "../../components/Card/UniversityCard";
import UniversityProfile from "../../components/Card/UniversityRight/UniversityProfile";
import ModalBase from "../../components/Forms/ModalBase";
import { useState } from "react";
import AddUniversity from "../../components/Forms/University/AddUniversity";
import { useApi } from "../../context/apiContext/ApiContext";

const fees = [
  { name: "10000-15000" },
  { name: "15000-20000" },
  { name: "20000-25000" },
  { name: "25000-30000" },
  { name: "30000+" },
];

export default function University() {
  const dispatch = useDispatch();

  const { autoUniversitysAssign, curUniversity, curCountry } = useSelector(
    (state) => state.university
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const { countryConfigs, universityConfigs } = useApi();
  const { countries = [] } = countryConfigs;
  const { university = [] } = universityConfigs;

  const ISearchBar = <SearchBar />;
  //   const IAutoBtn = <AutoBtn onSet={setAutoLeadsAssign} set={autoLeadsAssign} />;
  const IContents = university.map((university, index) => (
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
  const IAll = <All onClick={() => dispatch(setUniversityCurCountry("All"))} />;
  const ISelectorOne = (
    <Selector
      optionsObj={countries}
      placeholder="Select Country"
      onSet={setUniversityCurCountry}
      set={curCountry}
    />
  );
  const ISelectorTwo = (
    <Selector optionsObj={fees} placeholder="Select Fee Range" />
  );
  const IProfileCard = <UniversityProfile university={curUniversity} />;

  // const TopLeft = [<div key="search-bar">{ISelectorOne}</div>];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAll}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    // <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [
    <div key="search-bar">{ISearchBar}</div>,
    // <div key="selector-five">{ISelectorFive}</div>,
  ];

  return (
    <>
      <MainBody
        // TopLeft={TopLeft}
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
        width="50%"
      >
        <AddUniversity
          isUpadte={false}
          closeModal={closeModal}
          countries={countries}
        />
      </ModalBase>
    </>
  );
}
