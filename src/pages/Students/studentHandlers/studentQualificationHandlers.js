import apiClient from "../../../../config/axiosInstance";
import { setCurStudent } from "../../../../global/studentsSlice";
import { refetchStudents } from "../../../apiHooks/LeadAndApplicationHooks/useStudents";

const addQualification = async (newQualification, dispatch) => {
  try {
    const response = await apiClient.post(
      "/lead/addQualification",
      newQualification
    );

    dispatch(setCurStudent(response?.data?.data));
    refetchStudents();
  } catch (error) {
    console.error("Error adding mark:", error);
  }
};

const editQualification = async (updatedQualification, dispatch) => {
  try {
    const response = await apiClient.patch("/lead/editQualification", {
      name: updatedQualification.name,
      mark: updatedQualification.mark,
      qualificationId: updatedQualification._id,
    });

    dispatch(setCurStudent(response?.data?.data));
    refetchStudents();
  } catch (error) {
    console.error("Error editing mark:", error);
  }
};

const deleteQualification = async (cardId, leadId, dispatch) => {
  try {
    const response = await apiClient.patch(`/lead/removeQualification`, {
      leadId: leadId,
      qualificationId: cardId,
    });

    dispatch(setCurStudent(response?.data?.data));
    refetchStudents();
  } catch (error) {
    console.error("Error deleting mark:", error);
  }
};

export { addQualification, editQualification, deleteQualification };
