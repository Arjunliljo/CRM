import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../config/axiosInstance";
import {
  removeCurLeadDocument,
  setCurLead,
  setIsAssigning,
  setIsUniversitySelected,
  setLeadDetailToggle,
  setToAssignLeads,
  updateCurLeadDocuments,
  updateLeadStatus,
  updateCurLead,
} from "../../../global/leadsSlice";
import {
  useIDGetStatusesArray,
  useIDGetBranchesArray,
  useIDGetCountriesArray,
  useIDGetRolesArray,
} from "../../../api/Utilities/helper";
import { useApi } from "../../context/apiContext/ApiContext";
import { refetchCommens } from "../../apiHooks/useCommens";
import { refetchLeads } from "../../apiHooks/useLeads";
import {
  addQualification,
  deleteQualification,
  editQualification,
} from "./leadsHandler";

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

export default function Leads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { curLead, leadDetailToggle, isAssigning, toAssignLeads } = useSelector(
    (state) => state.leads
  );

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

  const handleAutoBtn = async (val) => {
    try {
      await apiClient.patch("/general/auto-assign", {
        autoAssignLeadsToBranch: val,
      });
      refetchCommens();
    } catch (error) {
      message.error("Failed to update Auto Assign Leads to Branch");
    }
  };

  const handleRemarkSubmit = async (remark, leadId) => {
    try {
      await apiClient.patch(`/lead/updateLeadRemark`, {
        leadId,
        remark,
      });
      message.success("Remark updated successfully");
      refetchLeads();
    } catch (error) {
      message.error("Error updating lead remark");
    }
  };

  const handleAssignLeads = (num) => {
    return () => {
      let selectedLeads;
      if (num === "all") {
        selectedLeads = leadsConfigs?.leads;
      } else {
        selectedLeads = leadsConfigs?.leads?.slice(0, Number(num));
      }
      dispatch(setToAssignLeads(selectedLeads));
    };
  };

  const handleAssignToUser = () => {
    if (toAssignLeads.length === 0) {
      message.error("No leads to assign");
      return;
    }
    setAssignToUser(true);
  };

  const handleAssignLeadsToggle = () => {
    dispatch(setIsAssigning(!isAssigning));
  };

  const handleDocumentSubmit = async (file, details) => {
    if (!file || !details || !curLead) return;

    const formData = new FormData();
    formData.append("docfile", file);
    formData.append("leadId", details.leadId);
    formData.append("content", details.content);
    formData.append("isImportant", Boolean(details.isImportant));

    try {
      const response = await apiClient.post("/lead/uploadLeadFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateCurLeadDocuments(response?.data?.data));
      return true;
    } catch (error) {
      console.error("Error uploading document:", error);
      return false;
    }
  };

  const handleDeleteDocument = async (doc) => {
    if (!curLead) return;
    try {
      await apiClient.patch("/lead/deleteLeadDocument", {
        leadId: curLead._id,
        documentObj: doc,
      });
      dispatch(removeCurLeadDocument(doc._id));
      refetchLeads();
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  };

  const handleUpdateDocument = async (doc, updatedData) => {
    if (!curLead) return;
    try {
      const response = await apiClient.patch("/lead/updateLeadDocuments", {
        leadId: curLead._id,
        documentObj: {
          ...doc,
          ...updatedData,
        },
      });
      dispatch(updateCurLeadDocuments(response?.data?.data));
      return true;
    } catch (error) {
      console.error("Error updating document:", error);
      return false;
    }
  };

  const canStartApplication = () => {
    if (!curLead) return false;

    const hasEnoughDocuments = curLead.documents?.length >= 4;
    const hasMarks = curLead.qualification?.length > 0;
    const hasStatus = Boolean(curLead.status);
    const hasEligibleCourse = Boolean(curLead.isUniversitySelected);

    return hasEnoughDocuments && hasMarks && hasStatus && hasEligibleCourse;
  };

  const handleStartApplication = async () => {
    try {
      await apiClient.post("/application", {
        lead: curLead._id,
        course: curLead.isUniversitySelected,
        status: curLead.status,
        applicationDate: new Date(),
        remark: curLead.remark,
        university: "23456789",
        country: curLead.country,
        studentId: "345678945678",
        documents: curLead.documents,
      });

      message.success("Application started successfully");
      navigate("/Student");
    } catch (error) {
      message.error("Error starting application");
    }
  };

  const handleStatusCardSubmit = async (status) => {
    try {
      const response = await apiClient.patch("/lead/updateLeadStatus", status);
      dispatch(updateLeadStatus(response?.data?.data));
      message.success("Status updated successfully");
      refetchLeads();
    } catch (error) {
      message.error("Error updating lead status");
    }
  };

  const handlePersonalDetailsSubmit = async (details) => {
    try {
      const response = await apiClient.patch(
        "/lead/updateLeadPersonalDetails",
        {
          leadId: curLead._id,
          details,
        }
      );
      dispatch(updateCurLead(response?.data?.data));
      refetchLeads();
      return true;
    } catch (error) {
      console.error("Error updating lead personal details:", error);
      return false;
    }
  };

  const handleModalSubmit = (newQualification) => {
    addQualification({ ...newQualification, leadId: curLead._id }, dispatch);
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

  // UI Components
  const IDocumentUpload = curLead && (
    <DocumentUpload
      lead={curLead}
      onUpload={handleDocumentSubmit}
      onDelete={handleDeleteDocument}
      onUpdate={handleUpdateDocument}
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
      statuses={statuses?.filter((val) => !val.isApplication)}
      lead={curLead}
      countries={countries}
      onsubmit={handleStatusCardSubmit}
    />
  );

  const IEligiableCourses = (
    <EligiableCourses onClick={handleEligibleCourseClick} />
  );

  const IActivityLog = <ActivityLog />;

  const IProfileCard = (
    <ProfileCard
      IDocumentUpload={IDocumentUpload}
      lead={curLead}
      IProfileCardStatus={IProfileCardStatus}
      IEligiableCourses={IEligiableCourses}
      IActivityLog={IActivityLog}
      personalDetails={IPersonalDetails}
      onsubmit={handleRemarkSubmit}
    />
  );

  const IStartApplication = canStartApplication() ? (
    <StartApplication handleStartApplication={handleStartApplication} />
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
        <NormalButton key="allocate" onClick={handleAssignToUser}>
          {`Allocate ${toAssignLeads.length}`}
        </NormalButton>
        <NormalButton key="all" onClick={handleAssignLeads("all")}>
          All
        </NormalButton>
        <NormalButton key="fifty" onClick={handleAssignLeads(50)}>
          50
        </NormalButton>
        <NormalButton key="twenty" onClick={handleAssignLeads(20)}>
          20
        </NormalButton>
        <NormalButton key="ten" onClick={handleAssignLeads(10)}>
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
    <Selector key="status" optionsObj={statusObj} />,
    <Selector key="branches" optionsObj={branchesObj} />,
    <Selector key="countries" optionsObj={countriesObj} />,
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
      onSubmit={handleRemarkSubmit}
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
