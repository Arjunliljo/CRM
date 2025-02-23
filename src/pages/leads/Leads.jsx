import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import {
  removeCurLeadDocument,
  setCurLead,
  setIsAssigning,
  setIsUniversitySelected,
  setLeadDetailToggle,
  setToAssignLeads,
  updateCurLead,
  updateCurLeadDocuments,
  updateLeadStatus,
} from "../../../global/leadsSlice";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import { useEffect, useState } from "react";
import ModalBase from "../../components/Forms/ModalBase";
import AddLead from "../../components/Forms/Leads/AddLead";
import {
  useIDGetStatusesArray,
  useIDGetBranchesArray,
  useIDGetCountriesArray,
} from "../../../api/Utilities/helper";
import { useIDGetRolesArray } from "../../../api/Utilities/helper";
import { useApi } from "../../context/apiContext/ApiContext";
import ProfileCardStatus from "../../components/Card/ProfileCard/ProfileCardStatus";
import EligiableCourses from "../../components/Card/ProfileCard/EligiableCourses";
import ActivityLog from "../../components/Card/ProfileCard/ActivityLog";
import apiClient from "../../../config/axiosInstance";
import { refetchCommens } from "../../apiHooks/useCommens";
import { message } from "antd";
import PersonalDetails from "../../components/Card/ProfileCard/PersonalDetails";
import { refetchLeads } from "../../apiHooks/useLeads";
import NormalButton from "../../components/buttons/NormalButton";
import AssingToUser from "./components/AssignToUser";
import {
  addQualification,
  deleteQualification,
  editQualification,
} from "./leadsHandler";
import { useNavigate } from "react-router-dom";

export default function Leads() {
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
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    status: "",
  });

  console.log(newLead, "newLead");
  console.log(curLead, "curLead");

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
      const response = await apiClient.patch(`/lead/updateLeadRemark`, {
        leadId: leadId,
        remark,
      });
      // dispatch(updateLeadRemark(remark));
      message.success("Remark updated successfully");
      refetchLeads();
    } catch (error) {
      console.error("Error updating lead remark:", error);
      message.error("Error updating lead remark");
    }
  };

  const handleAssignLeads = (num) => {
    return () => {
      if (num === 50) {
        dispatch(setToAssignLeads(leadsConfigs?.leads?.slice(0, 50)));
      } else if (num === 10) {
        dispatch(setToAssignLeads(leadsConfigs?.leads?.slice(0, 10)));
      } else if (num === 20) {
        dispatch(setToAssignLeads(leadsConfigs?.leads?.slice(0, 20)));
      } else if (num === "all") {
        dispatch(setToAssignLeads(leadsConfigs?.leads));
      }
    };
  };

  const [assignToUser, setAssignToUser] = useState(false);

  const handleAssignToUser = () => {
    if (toAssignLeads.length === 0) {
      message.error("No leads to assign");
      return;
    }
    setAssignToUser(true);
  };

  const ISearchBar = <SearchBar />;
  const IAutoBtn = (
    <AutoBtn callBack={handleAutoBtn} isAuto={autoAssignLeadsToBranch} />
  );

  const IContents = leadsConfigs?.leads?.map((lead, index) => (
    <LeadCard
      isAssigning={isAssigning}
      assigninSetter={setToAssignLeads}
      key={index}
      onSet={setCurLead}
      set={curLead}
      lead={lead}
      istoggle={leadDetailToggle}
      toggle={setLeadDetailToggle}
      onSubmit={handleRemarkSubmit}
      toAssignLeads={toAssignLeads}
    />
  ));

  const handleAssignLeadsToggle = () => {
    dispatch(setIsAssigning(!isAssigning));
  };

  const IAssign = (
    <NormalButton
      style={isAssigning ? { backgroundColor: "lightgray" } : {}}
      onClick={handleAssignLeadsToggle}
    >
      Assign Leads
    </NormalButton>
  );
  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>Add Leads</PrimaryBttn>
  );

  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector optionsObj={statusObj} />;
  const ISelectorTwo = <Selector optionsObj={branchesObj} />;
  const ISelectorThree = <Selector optionsObj={countriesObj} />;
  const ISelectorFour = <Selector optionsObj={rolesObj} />;

  const IAssingSelectNum = isAssigning ? (
    <NormalButton
      onClick={handleAssignToUser}
    >{`Allocate ${toAssignLeads.length}`}</NormalButton>
  ) : null;
  const IAssignAll = isAssigning ? (
    <NormalButton onClick={handleAssignLeads("all")}>{`All`}</NormalButton>
  ) : null;
  const IAssignFifty = isAssigning ? (
    <NormalButton onClick={handleAssignLeads(50)}>{`50`}</NormalButton>
  ) : null;
  const IAssignTen = isAssigning ? (
    <NormalButton onClick={handleAssignLeads(10)}>{`10`}</NormalButton>
  ) : null;
  const IAssignTwenty = isAssigning ? (
    <NormalButton onClick={handleAssignLeads(20)}>{`20`}</NormalButton>
  ) : null;

  const ISelectorFive = <Selector />;

  const handleEligibleCourseClick = (universityId) => {
    // Update the lead with the selected university
    console.log(universityId, "universityId");
    if (curLead) {
      const updatedLead = { ...curLead, isUniversitySelected: universityId };
      dispatch(setCurLead(updatedLead));
    }
    dispatch(setIsUniversitySelected(universityId ));
  };

  const canStartApplication = () => {
    if (!curLead) return false;

    const hasEnoughDocuments = curLead.documents && curLead.documents.length >= 4;
    const hasMarks = curLead.qualification && curLead.qualification.length > 0;
    const hasStatus = curLead.status && curLead.status !== "";
    const hasEligibleCourse = curLead.isUniversitySelected ? true : false; // Updated logic

    console.log(
      hasEnoughDocuments,
      hasMarks,
      hasStatus,
      hasEligibleCourse,
      "hasEnoughDocuments, hasMarks, hasStatus, hasEligibleCourse"
    );
    console.log(curLead, "curLead");
    return hasEnoughDocuments && hasMarks && hasStatus && hasEligibleCourse;
  };



  const handleStartApplication = () => {
    console.log("Start Application");

try {
  apiClient.post("/application", {
    lead: curLead._id,
    course: curLead.isUniversitySelected,
    status: curLead.status,
    applicationDate: new Date(),
    remark: curLead.remark,
    university: '23456789',
    country: curLead.country,
    studentId: '345678945678',
    documents: curLead.documents,
  });

  message.success("Application started successfully");
  navigate('/Student');
} catch (error) {
  console.error("Error starting application:", error);
}
  };

  const IStartApplication = canStartApplication() ? <StartApplication handleStartApplication={handleStartApplication} /> : null;


  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    <div key="auto-btn">{IAutoBtn}</div>,
    <div key="selector">{IAssign}</div>,
    <div key="assign-select-num">{IAssingSelectNum}</div>,
    <div key="assign-all">{IAssignAll}</div>,
    <div key="assign-fifty">{IAssignFifty}</div>,
    <div key="assign-ten">{IAssignTen}</div>,
    <div key="assign-twenty">{IAssignTwenty}</div>,
  ];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAllLeads}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];

  const BottomRight = [<div key="selector-four">{ISelectorFour}</div>];

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

  const handleStatusCardSubmit = async (status) => {
    try {
      const respones = await apiClient.patch("/lead/updateLeadStatus", status);

      dispatch(updateLeadStatus(respones?.data?.data));
      message.success("Status updated successfully");
      refetchLeads();
    } catch (error) {
      console.error("Error updating lead status:", error);
      message.error("Error updating lead status");
    }
  };

  const IDocumentUpload = curLead && (
    <DocumentUpload
      lead={curLead}
      onUpload={handleDocumentSubmit}
      onDelete={handleDeleteDocument}
      onUpdate={handleUpdateDocument}
    />
  );

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
      lead={curLead && curLead}
      countries={countries}
      onsubmit={handleStatusCardSubmit}
    />
  );
  const IEligiableCourses = (
    <EligiableCourses onCourseClick={handleEligibleCourseClick} />
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
      // modalSubmit={handleModalSubmit}
    />
  );

  useEffect(() => {
    if (!isAssigning) {
      dispatch(setToAssignLeads([]));
    }
  }, [isAssigning, dispatch]);

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
        <AssingToUser assigningLeads={toAssignLeads} onClick={() => {}} />
      </ModalBase>
    </>
  );
}
