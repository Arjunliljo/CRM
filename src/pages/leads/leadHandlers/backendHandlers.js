import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import { refetchCommens } from "../../../apiHooks/useCommens";
import { updateCurLead, updateLeadStatus } from "../../../../global/leadsSlice";
import { refetchLeads } from "../../../apiHooks/useLeads";

export const handleAutoBtn = async (val) => {
  try {
    await apiClient.patch("/general/auto-assign", {
      autoAssignLeadsToBranch: val,
    });
    refetchCommens();
  } catch (error) {
    message.error("Failed to update Auto Assign Leads to Branch");
  }
};

export const canStartApplication = (curLead) => {
  if (!curLead) return false;

  const hasEnoughDocuments = curLead.documents?.length >= 4;
  const hasMarks = curLead.qualification?.length > 0;
  const hasStatus = Boolean(curLead.status);
  const hasEligibleCourse = Boolean(curLead.isUniversitySelected);

  return hasEnoughDocuments && hasMarks && hasStatus && hasEligibleCourse;
};

export const handleStartApplication = async (curLead, navigate) => {
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

    await message.success("Application started successfully");
    navigate("/Student");
    refetchLeads();
  } catch (error) {
    message.error("Error starting application");
  }
};

export const handleStatusCardSubmit = async (status, dispatch) => {
  try {
    const response = await apiClient.patch("/lead/updateLeadStatus", status);
    dispatch(updateLeadStatus(response?.data?.data));
    message.success("Status updated successfully");
    refetchLeads();
  } catch (error) {
    message.error("Error updating lead status");
  }
};

export const handlePersonalDetailsSubmit = async (
  details,
  curLead,
  dispatch
) => {
  try {
    const response = await apiClient.patch("/lead/updateLeadPersonalDetails", {
      leadId: curLead._id,
      details,
    });
    dispatch(updateCurLead(response?.data?.data));
    refetchLeads();
    return true;
  } catch (error) {
    console.error("Error updating lead personal details:", error);
    return false;
  }
};
