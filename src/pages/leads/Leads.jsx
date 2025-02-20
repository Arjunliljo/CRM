import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import { removeCurLeadDocument, setCurLead, setLeadDetailToggle, updateCurLeadDocuments, updateLeadRemark } from "../../../global/leadsSlice";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import { useState } from "react";
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

export default function Leads() {
  const { curLead, leadDetailToggle } = useSelector((state) => state.leads);

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

  const handleRemarkSubmit = async (remark , leadId) => {

    try {
      const response = await apiClient.patch(`/lead/updateLeadRemark`, {
        leadId: leadId,
        remark,
      });
      console.log(response);
      dispatch(updateLeadRemark(remark));
      message.success("Remark updated successfully");
    } catch (error) {
      console.error("Error updating lead remark:", error);
      message.error("Error updating lead remark");
    }
  };

  const ISearchBar = <SearchBar />;
  const IAutoBtn = (
    <AutoBtn callBack={handleAutoBtn} isAuto={autoAssignLeadsToBranch} />
  );

  const IContents = leadsConfigs?.leads?.map((lead, index) => (
    <LeadCard
      key={index}
      onSet={setCurLead}
      set={curLead}
      lead={lead}
      istoggle={leadDetailToggle}
      toggle={setLeadDetailToggle}
      onSubmit={handleRemarkSubmit}
    />
  ));

  const ISelector = <Selector />;
  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>Add Leads</PrimaryBttn>
  );

  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector optionsObj={statusObj} />;
  const ISelectorTwo = <Selector optionsObj={branchesObj} />;
  const ISelectorThree = <Selector optionsObj={countriesObj} />;
  const ISelectorFour = <Selector optionsObj={rolesObj} />;
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

  const BottomRight = [<div key="selector-four">{ISelectorFour}</div>];

  const handleDocumentSubmit = async (file, details) => {
    if (!file || !details || !curLead) return;

    const formData = new FormData();
    formData.append("docfile", file);
    formData.append("leadId", curLead._id);
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
        documentObj: doc
      });
      dispatch(removeCurLeadDocument(doc._id));
      return true;
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
          ...updatedData
        }
      });
      dispatch(updateCurLeadDocuments(response?.data?.data));
      return true;
    } catch (error) {
      console.error("Error updating document:", error);
      return false;
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
const IPersonalDetails = <PersonalDetails lead={curLead} />

  const IProfileCardStatus = (
    <ProfileCardStatus
      statuses={statuses?.filter((val) => !val.isApplication)}
      lead={curLead}
      countries={countries}
    />
  );
  const IEligiableCourses = <EligiableCourses />;
  const IActivityLog = <ActivityLog />;

  const IProfileCard = (
    <ProfileCard
      IDocumentUpload={IDocumentUpload}
      lead={curLead}
      IProfileCardStatus={IProfileCardStatus}
      IEligiableCourses={IEligiableCourses}
      IActivityLog={IActivityLog}
      personalDetails={IPersonalDetails}
    />
  );

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
        // personalDetails={IPersonalDetails}
      />

      <ModalBase title="Add Lead" isOpen={isModalOpen} closeModal={closeModal}>
        <AddLead
          closeModal={closeModal}
          newLead={newLead}
          setNewLead={setNewLead}
          handleChange={handleChange}
        />
      </ModalBase>
    </>
  );
}
