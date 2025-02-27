import apiClient from "../../../../config/axiosInstance";
import { setCurStudent } from "../../../../global/studentsSlice";
import { refetchStudents } from "../../../apiHooks/useStudents";

export const handlePersonalDetailsSubmit = async (
  details,
  curStudent,
  dispatch
) => {
  try {
    const res = await apiClient.patch(`/lead/${curStudent._id}`, details);
    dispatch(setCurStudent(res?.data?.data));
    refetchStudents();
    return true;
  } catch (error) {
    console.error("Error updating lead personal details:", error);
    return false;
  }
};
