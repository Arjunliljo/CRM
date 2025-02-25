import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCurLead,
  setIsAssigning,
  setIsUniversitySelected,
  setLeadCurCountry,
  setLeadDetailToggle,
  setLeadsCurBranch,
  setLeadsCurStatus,
  setToAssignLeads,
} from "../../../global/leadsSlice";
import {
  useIDGetStatusesArray,
  useIDGetBranchesArray,
  useIDGetCountriesArray,
  useIDGetRolesArray,
} from "../../../api/Utilities/helper";
import { useApi } from "../../context/apiContext/ApiContext";

import {
  addQualification,
  deleteQualification,
  editQualification,
} from "./leadHandlers/qualificationHandlers";

// Component imports
import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import ModalBase from "../../components/Forms/ModalBase";
import AddLead from "../../components/Forms/Leads/AddLead";
import ProfileCardStatus from "../../components/Card/ProfileCard/ProfileCardStatus";
import EligiableCourses from "../../components/Card/ProfileCard/EligiableCourses";
import ActivityLog from "../../components/Card/ProfileCard/ActivityLog";
import PersonalDetails from "../../components/Card/ProfileCard/PersonalDetails";
import NormalButton from "../../components/buttons/NormalButton";
import AssingToUser from "./components/AssignToUser";
import {
  canStartApplication,
  handleAutoBtn,
  handlePersonalDetailsSubmit,
  handleStartApplication,
  handleStatusCardSubmit,
} from "./leadHandlers/backendHandlers";
import {
  handleAssignLeads,
  handleAssignToUser,
} from "./leadHandlers/assignLeadsHandler";
import {
  handleDeleteDocument,
  handleDocumentSubmit,
  handleUpdateDocument,
} from "./leadHandlers/documentHandler";
import { refetchLeads } from "../../apiHooks/useLeads";

export default function Leads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    curLead,
    leadDetailToggle,
    isAssigning,
    toAssignLeads,
    curStatus,
    curSource,
    curBranch,
    curCountry,
  } = useSelector((state) => state.leads);

  const {
    leadsConfigs,
    statusConfigs,
    roleConfigs,
    branchConfigs,
    countryConfigs,
    commonsConfigs,
  } = useApi();

  const { statuses = [] } = statusConfigs;
  const { roles = [] } = roleConfigs;
  const { branches = [] } = branchConfigs;
  const { countries = [] } = countryConfigs;
  const { commons = {} } = commonsConfigs;
  const { autoAssignLeadsToBranch } = commons;

  const statusObj = useIDGetStatusesArray(statuses);
  const rolesObj = useIDGetRolesArray(roles);
  const branchesObj = useIDGetBranchesArray(branches);
  const countriesObj = useIDGetCountriesArray(countries);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignToUser, setAssignToUser] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssignLeadsToggle = () => {
    dispatch(setIsAssigning(!isAssigning));
  };

  const handleModalSubmit = (newQualification) => {
    addQualification({ ...newQualification, leadId: curLead._id }, dispatch);
    refetchLeads();
  };

  const handleEditQualification = (updatedQualification) => {
    editQualification(
      { ...updatedQualification, leadId: curLead._id },
      dispatch
    );
  };

  const handleDeleteQualification = (cardId) => {
    deleteQualification(cardId, curLead._id, dispatch);
  };

  const handleEligibleCourseClick = (universityId) => {
    if (curLead) {
      const updatedLead = { ...curLead, isUniversitySelected: universityId };
      dispatch(setCurLead(updatedLead));
    }
    dispatch(setIsUniversitySelected(universityId));
  };

  useEffect(() => {
    if (!isAssigning) {
      dispatch(setToAssignLeads([]));
    }
  }, [isAssigning, dispatch]);

  const IDocumentUpload = curLead && (
    <DocumentUpload
      lead={curLead}
      onUpload={(file, details) =>
        handleDocumentSubmit(file, details, dispatch)
      }
      onDelete={(doc) => handleDeleteDocument(doc, curLead, dispatch)}
      onUpdate={(doc, updatedData) =>
        handleUpdateDocument(doc, updatedData, curLead, dispatch)
      }
    />
  );

  const IPersonalDetails = curLead && (
    <PersonalDetails
      lead={curLead}
      onSubmit={handlePersonalDetailsSubmit}
      modalSubmit={handleModalSubmit}
      editQualification={handleEditQualification}
      deleteQualification={handleDeleteQualification}
    />
  );

  const IProfileCardStatus = (
    <ProfileCardStatus
      statuses={statuses}
      lead={curLead}
      countries={countries}
      onsubmit={handleStatusCardSubmit}
    />
  );

  const IEligiableCourses = (
    <EligiableCourses onClick={handleEligibleCourseClick} />
  );

  const IActivityLog = <ActivityLog curLead={curLead} />;

  const IProfileCard = (
    <ProfileCard
      IDocumentUpload={IDocumentUpload}
      lead={curLead}
      IProfileCardStatus={IProfileCardStatus}
      IEligiableCourses={IEligiableCourses}
      IActivityLog={IActivityLog}
      personalDetails={IPersonalDetails}
      onsubmit={() => {}}
    />
  );

  const IStartApplication = canStartApplication(curLead) ? (
    <StartApplication
      handleStartApplication={() => handleStartApplication(curLead, navigate)}
    />
  ) : null;

  const TopLeft = [
    <SearchBar key="search-bar" />,
    <AutoBtn
      key="auto-btn"
      callBack={handleAutoBtn}
      isAuto={autoAssignLeadsToBranch}
    />,
    <NormalButton
      key="assign"
      style={isAssigning ? { backgroundColor: "lightgray" } : {}}
      onClick={handleAssignLeadsToggle}
    >
      Assign Leads
    </NormalButton>,
    isAssigning && (
      <>
        <NormalButton
          key="allocate"
          onClick={handleAssignToUser(toAssignLeads, setAssignToUser)}
        >
          {`Allocate ${toAssignLeads.length}`}
        </NormalButton>
        <NormalButton
          key="all"
          onClick={handleAssignLeads("all", leadsConfigs?.leads, dispatch)}
        >
          All
        </NormalButton>
        <NormalButton
          key="fifty"
          onClick={handleAssignLeads(50, leadsConfigs?.leads, dispatch)}
        >
          50
        </NormalButton>
        <NormalButton
          key="twenty"
          onClick={handleAssignLeads(20, leadsConfigs?.leads, dispatch)}
        >
          20
        </NormalButton>
        <NormalButton
          key="ten"
          onClick={handleAssignLeads(10, leadsConfigs?.leads, dispatch)}
        >
          10
        </NormalButton>
      </>
    ),
  ].filter(Boolean);

  const TopRight = [
    <PrimaryBttn key="add-lead" onClick={() => setIsModalOpen(true)}>
      Add Leads
    </PrimaryBttn>,
  ];

  const BottomLeft = [
    <AllLeads key="all-leads" />,
    <Selector
      key="status"
      optionsObj={statusObj}
      onSet={setLeadsCurStatus}
      set={curStatus}
      placeholder="All Status"
    />,
    <Selector
      key="branches"
      set={curBranch}
      optionsObj={branchesObj}
      onSet={setLeadsCurBranch}
      placeholder="All Branches"
    />,

    <Selector
      key="countries"
      placeholder="All Countries"
      set={curCountry}
      optionsObj={countriesObj}
      onSet={setLeadCurCountry}
    />,
  ];

  const BottomRight = [<Selector key="roles" optionsObj={rolesObj} />];

  const IContents = leadsConfigs?.leads?.map((lead, index) => (
    <LeadCard
      key={index}
      isAssigning={isAssigning}
      assigninSetter={setToAssignLeads}
      onSet={setCurLead}
      set={curLead}
      lead={lead}
      istoggle={leadDetailToggle}
      toggle={setLeadDetailToggle}
      onSubmit={() => {}}
      toAssignLeads={toAssignLeads}
    />
  ));

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

      <ModalBase
        title="Add Lead"
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <AddLead
          closeModal={() => setIsModalOpen(false)}
          newLead={newLead}
          setNewLead={setNewLead}
          handleChange={handleChange}
          countries={countries}
          statuses={statuses}
        />
      </ModalBase>

      <ModalBase
        centered={false}
        title="Assign Leads"
        isOpen={assignToUser}
        closeModal={() => setAssignToUser(false)}
      >
        <AssingToUser assigningLeads={toAssignLeads} />
      </ModalBase>
    </>
  );
}
