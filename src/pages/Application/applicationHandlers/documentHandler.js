import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import {
  removeCurLeadDocument,
  updateCurLeadDocuments,
} from "../../../../global/leadsSlice";
import { refetchLeads } from "../../../apiHooks/LeadAndApplicationHooks/useLeads";

export const handleDocumentSubmit = async (file, details, dispatch) => {
  if (!file || !details) return;

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

export const handleDeleteDocument = async (doc, curLead, dispatch) => {
  if (!curLead) return;
  try {
    await apiClient.patch("/lead/deleteLeadDocument", {
      leadId: curLead._id,
      documentObj: doc,
    });
    dispatch(removeCurLeadDocument(doc._id));
    message.success("Document deleted successfully");
    refetchLeads();
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
};

export const handleUpdateDocument = async (
  doc,
  updatedData,
  curLead,
  dispatch
) => {
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
