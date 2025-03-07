import SearchBar from "../../components/smallComponents/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import ApplicationCard from "./components/ApplicationCard";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import {
  setApplicationDetailToggle,
  setApplicationIsAssigning,
  setCurApplication,
  setCurApplicationBranch,
  setCurApplicationCountry,
  setCurApplicationRole,
  setCurApplicationStatus,
  setCurApplicationUser,
  setToAssignApplications,
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
import NormalButton from "../../components/buttons/NormalButton";
import { handleAssignStudents } from "../Students/studentHandlers/assignStudentHandler";
import {
  handleDeleteDocument,
  handleDocumentSubmit,
  handleUpdateDocument,
} from "../leads/leadHandlers/documentHandler";

export default function Application() {
  const dispatch = useDispatch();
  const {
    countryConfigs,
    statusConfigs,
    roleConfigs,
    branchConfigs,
    commonsConfigs,
    campaignsConfigs,
    usersConfigs,
  } = useApi();
  const { countries = [] } = countryConfigs;
  const { statuses = [] } = statusConfigs;
  const { roles = [] } = roleConfigs;
  const { branches = [] } = branchConfigs;
  const { commons = {} } = commonsConfigs;
  const { campaigns = [] } = campaignsConfigs;
  const { users = [] } = usersConfigs;

  const {
    applicationDetailToggle,
    curApplication,
    curStatus,
    curSource,
    curBranch,
    curCountry,
    curCampaign,
    curRole,
    curUser,
    isAssigning,
    toAssignApplications,
  } = useSelector((state) => state.applications);

  const { applicationsConfigs } = useApi();
  const { applications = [] } = applicationsConfigs;
  const { lead: curStudent = [] } = curApplication;

  const IDocumentUpload = curApplication && (
    <DocumentUpload
      lead={curApplication}
      onUpload={(file, details) =>
        handleDocumentSubmit(file, details, dispatch)
      }
      onDelete={(doc) => handleDeleteDocument(doc, curApplication, dispatch)}
      onUpdate={(doc, updatedData) =>
        handleUpdateDocument(doc, updatedData, curApplication, dispatch)
      }
    />
  );

  const IContents = applications?.map((application, index) => (
    <ApplicationCard
      key={index}
      onSet={setCurApplication}
      set={curApplication}
      application={application}
      istoggle={applicationDetailToggle}
      toggle={setApplicationDetailToggle}
      countires={countries}
      isAssigning={isAssigning}
      assigninSetter={setToAssignApplications}
      toAssignApplications={toAssignApplications}
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

  const IPrimaryBttn = <PrimaryBttn>Add Leads</PrimaryBttn>;
  const IAllLeads = (
    <AllLeads text="All Applications" value={applications?.length} />
  );

  const ISelectorOne = (
    <Selector
      key="status"
      optionsObj={statuses?.filter((val) => val.isApplication)}
      onSet={setCurApplicationStatus}
      set={curStatus}
      placeholder="All Status"
    />
  );
  const ISelectorTwo = (
    <Selector
      key="branch"
      optionsObj={branches}
      onSet={setCurApplicationBranch}
      set={curBranch}
      placeholder="All Branch"
    />
  );
  const ISelectorThree = (
    <Selector
      key="country"
      optionsObj={countries}
      onSet={setCurApplicationCountry}
      set={curCountry}
      placeholder="All Country"
    />
  );
  const ISelectorFour = (
    <Selector
      key="roles"
      placeholder="All Roles"
      optionsObj={roles}
      set={curRole}
      onSet={setCurApplicationRole}
    />
  );
  const ISelectorFive = (
    <Selector
      key="users"
      placeholder="All Users"
      optionsObj={users}
      set={curUser}
      onSet={setCurApplicationUser}
    />
  );

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

  const handleAppAssignToggle = () => {
    dispatch(setApplicationIsAssigning(!isAssigning));
  };

  const TopLeft = [
    <SearchBar key="search-bar" />,
    <NormalButton
      key="assign"
      style={isAssigning ? { backgroundColor: "lightgray" } : {}}
      onClick={handleAppAssignToggle}
    >
      Assign Leads
    </NormalButton>,
    isAssigning && (
      <>
        <NormalButton key="allocate" onClick={() => {}}>
          {`Allocate ${toAssignApplications.length}`}
        </NormalButton>
        <NormalButton
          key="all"
          onClick={handleAssignStudents("all", applications, dispatch)}
        >
          All
        </NormalButton>
        <NormalButton
          key="fifty"
          onClick={handleAssignStudents(50, applications, dispatch)}
        >
          50
        </NormalButton>
        <NormalButton
          key="twenty"
          onClick={handleAssignStudents(20, applications, dispatch)}
        >
          20
        </NormalButton>
        <NormalButton
          key="ten"
          onClick={handleAssignStudents(10, applications, dispatch)}
        >
          10
        </NormalButton>
      </>
    ),
  ].filter(Boolean);

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
