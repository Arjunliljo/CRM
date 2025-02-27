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
  const hasStatus = Boolean(curLead?.status);
  const hasEligibleCourse = Boolean(curLead?.course);

  return hasEnoughDocuments && hasMarks && hasStatus && hasEligibleCourse;
};

export const handleStartApplication = async (curLead, navigate, status) => {
  try {
    const res = await apiClient.post("/application", {
      lead: curLead._id,
      status,
      course: curLead.course,
      applicationDate: new Date(),
      remark: curLead.remark || "New Application",
      university: curLead?.university,
      country: curLead.country,
      studentId: "345678945678",
      documents: curLead.documents,
    });

    console.log(res, "res");

    message.success("Application started successfully");
    navigate("/Student");
    refetchLeads();
  } catch (error) {
    console.log(error, "error");
    message.error("Error starting application");
  }
};

export const handleStatusCardSubmit = async (data, dispatch, leadId) => {
  try {
    const response = await apiClient.patch(`lead/${leadId}`, data);
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
