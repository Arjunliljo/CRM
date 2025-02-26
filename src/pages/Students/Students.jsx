import SearchBar from "../../components/smallComponents/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import { useApi } from "../../context/apiContext/ApiContext";
import StudentsCard from "../../components/Card/StudentsCard";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import ModalBase from "../../components/Forms/ModalBase";
import { useState } from "react";
import {
  useIDGetStatusesArray,
  useIDGetRolesArray,
  useIDGetBranchesArray,
  useIDGetCountriesArray,
} from "../../../api/Utilities/helper";
import ProfileCardStatus from "../../components/Card/ProfileCard/ProfileCardStatus";
import EligiableCourses from "../../components/Card/ProfileCard/EligiableCourses";
import PersonalDetails from "../../components/Card/ProfileCard/PersonalDetails";
import apiClient from "../../../config/axiosInstance";
import {
  removeCurLeadDocument,
  updateCurLeadDocuments,
  updateLeadStatus,
} from "../../../global/leadsSlice";
import { message } from "antd";
import AddLead from "../../components/Forms/Leads/AddLead";
import { refetchLeads } from "../../apiHooks/useLeads";
import NormalButton from "../../components/buttons/NormalButton";
import {
  setCurStudent,
  setStudentCurBranch,
  setStudentCurCampaigns,
  setStudentCurCountry,
  setStudentCurRole,
  setStudentCurStatus,
  setStudentCurUser,
  setStudentDetailToggle,
  setStudentIsAssigning,
  setToAssignStudents,
} from "../../../global/studentsSlice";

import {
  handleAssignStudents,
  handleAssignToUser,
} from "./studentHandlers/assignStudentHandler";
import AssingToUser from "../leads/components/AssignToUser";

export default function Students() {
  const {
    curStudent,
    studentDetailToggle,
    isAssigning,
    toAssignStudents,
    curRole,
    curUser,
    curBranch,
    curStatus,
    curCountry,
    curCampaign,
  } = useSelector((state) => state.students);

  const {
    leadsConfigs,
    statusConfigs,
    roleConfigs,
    branchConfigs,
    countryConfigs,
    campaignsConfigs,
    usersConfigs,
  } = useApi();

  const { statuses = [] } = statusConfigs;
  const { roles = [] } = roleConfigs;
  const { branches = [] } = branchConfigs;
  const { countries = [] } = countryConfigs;
  const { campaigns = [] } = campaignsConfigs;
  const { users = [] } = usersConfigs;

  const dispatch = useDispatch();

  const statusObj = useIDGetStatusesArray(statuses);
  const rolesObj = useIDGetRolesArray(roles);
  const branchesObj = useIDGetBranchesArray(branches);
  const countriesObj = useIDGetCountriesArray(countries);
  const [assignToUser, setAssignToUser] = useState(false);

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

  const handleDocumentSubmit = async (file, details) => {
    if (!file || !details || !curStudent) return;

    const formData = new FormData();
    formData.append("docfile", file);
    formData.append("leadId", curStudent._id);
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
    if (!curStudent) return;
    try {
      await apiClient.patch("/lead/deleteLeadDocument", {
        leadId: curStudent._id,
        documentObj: doc,
      });
      dispatch(removeCurLeadDocument(doc._id));
      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  };

  const handleUpdateDocument = async (doc, updatedData) => {
    if (!curStudent) return;
    try {
      const response = await apiClient.patch("/lead/updateLeadDocuments", {
        leadId: curStudent._id,
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
      refetchLeads();
      message.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating lead status:", error);
      message.error("Error updating lead status");
    }
  };

  const handlePersonalDetailsSubmit = async (details) => {
    try {
      await apiClient.patch("/lead/updateLeadPersonalDetails", {
        leadId: curStudent._id,
        details,
      });
      refetchLeads();
      return true;
    } catch (error) {
      console.error("Error updating lead personal details:", error);
      return false;
    }
  };

  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>Add Students</PrimaryBttn>
  );

  const IDocumentUpload = curStudent && (
    <DocumentUpload
      lead={curStudent}
      onUpload={handleDocumentSubmit}
      onDelete={handleDeleteDocument}
      onUpdate={handleUpdateDocument}
    />
  );

  const IProfileCardStatus = (
    <ProfileCardStatus
      statuses={statuses?.filter((val) => !val.isApplication)}
      lead={curStudent && curStudent}
      countries={countries}
      onsubmit={handleStatusCardSubmit}
    />
  );

  const IPersonalDetails = curStudent && (
    <PersonalDetails lead={curStudent} onSubmit={handlePersonalDetailsSubmit} />
  );

  const IEligiableCourses = <EligiableCourses />;
  const IProfileCard = (
    <ProfileCard
      IDocumentUpload={IDocumentUpload}
      lead={curStudent}
      IProfileCardStatus={IProfileCardStatus}
      IEligiableCourses={IEligiableCourses}
      personalDetails={IPersonalDetails}
    />
  );

  const handleAssignLeadsToggle = () => {
    dispatch(setStudentIsAssigning(!isAssigning));
  };

  const TopLeft = [
    <SearchBar key="search-bar" />,
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
          onClick={handleAssignToUser(toAssignStudents, setAssignToUser)}
        >
          {`Allocate ${toAssignStudents.length}`}
        </NormalButton>
        <NormalButton
          key="all"
          onClick={handleAssignStudents("all", leadsConfigs?.leads, dispatch)}
        >
          All
        </NormalButton>
        <NormalButton
          key="fifty"
          onClick={handleAssignStudents(50, leadsConfigs?.leads, dispatch)}
        >
          50
        </NormalButton>
        <NormalButton
          key="twenty"
          onClick={handleAssignStudents(20, leadsConfigs?.leads, dispatch)}
        >
          20
        </NormalButton>
        <NormalButton
          key="ten"
          onClick={handleAssignStudents(10, leadsConfigs?.leads, dispatch)}
        >
          10
        </NormalButton>
      </>
    ),
  ].filter(Boolean);
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">
      <AllLeads key="all-leads" />
    </div>,
    <div key="selector-one">
      <Selector
        key="status"
        optionsObj={statusObj}
        placeholder="All Status"
        set={curStatus}
        onSet={setStudentCurStatus}
      />
    </div>,

    <div key="selector-three">
      <Selector
        key="branches"
        optionsObj={branchesObj}
        placeholder="All Branches"
        set={curBranch}
        onSet={setStudentCurBranch}
      />
    </div>,
    <div key="selector-two">
      <Selector
        key="country"
        optionsObj={countriesObj}
        placeholder="All Countries"
        set={curCountry}
        onSet={setStudentCurCountry}
      />
    </div>,
    <div key="selector-two">
      <Selector
        key="campaign"
        optionsObj={campaignsConfigs?.campaigns}
        placeholder="All Campaigns"
        set={curCampaign}
        onSet={setStudentCurCampaigns}
      />
    </div>,
  ];
  const BottomRight = [
    <Selector
      key="roles"
      placeholder="All Roles"
      optionsObj={rolesObj}
      set={curRole}
      onSet={setStudentCurRole}
    />,
    <Selector
      key="users"
      placeholder="All Users"
      optionsObj={users}
      set={curUser}
      onSet={setStudentCurUser}
    />,
  ];
  const IContents = leadsConfigs?.leads?.map((student, index) => (
    <StudentsCard
      key={index}
      isAssigning={isAssigning}
      assigninSetter={setToAssignStudents}
      toAssignStudents={toAssignStudents}
      onSet={setCurStudent}
      set={curStudent}
      student={student}
      istoggle={studentDetailToggle}
      toggle={setStudentDetailToggle}
      onsubmit={() => {}}
    />
  ));

  return (
    <>
      <MainBody
        TopLeft={TopLeft}
        TopRight={TopRight}
        IContents={IContents}
        switching={studentDetailToggle}
        BottomLeft={BottomLeft}
        BottomRight={BottomRight}
        ProfileCard={IProfileCard}
      />
      <ModalBase
        title="Add Student"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <AddLead
          closeModal={closeModal}
          newLead={newLead}
          setNewLead={setNewLead}
          handleChange={handleChange}
        />
      </ModalBase>

      <ModalBase
        centered={false}
        title="Assign Leads"
        isOpen={assignToUser}
        closeModal={() => setAssignToUser(false)}
      >
        <AssingToUser assigningLeads={toAssignStudents} />
      </ModalBase>
    </>
  );
}
