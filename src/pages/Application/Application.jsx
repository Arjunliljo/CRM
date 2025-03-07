import SearchBar from "../../components/smallComponents/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import ApplicationCard from "./components/ApplicationCard";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import {
  setApplicationDetailToggle,
  setCurApplication,
} from "../../../global/applicationSlice";
import { useApi } from "../../context/apiContext/ApiContext";
import ProfileCardApplicationStatus from "./components/ProfileCardApplicationStatus";
import ApplicationEligiableCourse from "../../components/EligialbleCourses/ApplicationEligiableCourse/ApplicationEligiableCourse";
import { handlePersonalDetailsSubmit } from "../leads/leadHandlers/backendHandlers";
import PersonalDetails from "../../components/Card/ProfileCard/PersonalDetails";
import {
  addQualification,
  deleteQualification,
  editQualification,
} from "../leads/leadHandlers/qualificationHandlers";
import { refetchStudents } from "../../apiHooks/LeadAndApplicationHooks/useStudents";
import ActivityLog from "../../components/Card/ProfileCard/ActivityLog";
import { handleStatusCardSubmit } from "./applicationHandlers/backendHandlers";
import { useEffect } from "react";

export default function Application() {
  const dispatch = useDispatch();
  const { countryConfigs, statusConfigs } = useApi();
  const { countries = [] } = countryConfigs;
  const { statuses = [] } = statusConfigs;
  const { applicationDetailToggle, curApplication } = useSelector(
    (state) => state.applications
  );

  const { applicationsConfigs } = useApi();
  const { applications = [] } = applicationsConfigs;
  const { lead: curStudent = [] } = curApplication;

  const ISearchBar = <SearchBar />;

  const IContents = applications?.map((application, index) => (
    <ApplicationCard
      key={index}
      onSet={setCurApplication}
      set={curApplication}
      application={application}
      istoggle={applicationDetailToggle}
      toggle={setApplicationDetailToggle}
      countires={countries}
    />
  ));

  const handleModalSubmit = (newQualification) => {
    addQualification({ ...newQualification, leadId: curStudent._id }, dispatch);
    refetchStudents();
  };

  const handleEditQualification = (updatedQualification) => {
    editQualification(
      { ...updatedQualification, leadId: curStudent._id },
      dispatch
    );
  };

  const handleDeleteQualification = (cardId) => {
    deleteQualification(cardId, curStudent._id, dispatch);
  };

  const IPersonalDetails = curStudent && (
    <PersonalDetails
      lead={curStudent}
      onSubmit={handlePersonalDetailsSubmit}
      modalSubmit={handleModalSubmit}
      editQualification={handleEditQualification}
      deleteQualification={handleDeleteQualification}
    />
  );

  const IEligiableCourses = (
    <ApplicationEligiableCourse application={curApplication} />
  );

  const IProfileCardStatus = (
    <ProfileCardApplicationStatus
      statuses={statuses?.filter((val) => val.isApplication)}
      application={curApplication && curApplication}
      curStudent={curStudent}
      countries={countries}
      onSubmit={handleStatusCardSubmit}
    />
  );

  const IActivityLog = <ActivityLog curLead={curStudent} />;

  const ISelector = <Selector />;
  const IPrimaryBttn = <PrimaryBttn>Add Leads</PrimaryBttn>;
  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const ISelectorFour = <Selector />;
  const ISelectorFive = <Selector />;
  const IDocumentUpload = <DocumentUpload />;

  const IProfileCard = (
    <ProfileCard
      IDocumentUpload={IDocumentUpload}
      lead={curStudent}
      IProfileCardStatus={IProfileCardStatus}
      IEligiableCourses={IEligiableCourses}
      personalDetails={IPersonalDetails}
      IActivityLog={IActivityLog}
    />
  );

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
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

  useEffect(() => {
    if (applications?.length > 0) {
      const application = applications.find(
        (app) => app?._id === curApplication?._id
      );
      if (application) {
        dispatch(setCurApplication(application));
      }
    }
  }, [applications, curApplication?._id, dispatch]);

  return (
    <MainBody
      TopLeft={TopLeft}
      TopRight={TopRight}
      IContents={IContents}
      switching={applicationDetailToggle}
      BottomLeft={BottomLeft}
      BottomRight={BottomRight}
      ProfileCard={IProfileCard}
    />
  );
}
