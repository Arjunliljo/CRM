import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import { refetchCommens } from "../../../apiHooks/useCommens";
import { updateCurLead, updateLeadStatus } from "../../../../global/leadsSlice";
import { refetchLeads } from "../../../apiHooks/LeadAndApplicationHooks/useLeads";
import { refetchApplications } from "../../Students/hooks/useApplications";
import {
  setCurApplication,
  setCurApplicationStatus,
} from "../../../../global/applicationSlice";

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

export const handleStatusCardSubmit = async (data, dispatch, applicationId) => {
  try {
    const response = await apiClient.patch(
      `application/${applicationId}`,
      data
    );

    message.success("Status updated successfully");
    refetchApplications();
  } catch (error) {
    console.log(error, "error");

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
    dispatch(setCurApplication(response?.data?.data));
    refetchApplications();
    return true;
  } catch (error) {
    console.error("Error updating lead personal details:", error);
    return false;
  }
};
