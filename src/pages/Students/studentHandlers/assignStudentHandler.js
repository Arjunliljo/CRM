import { message } from "antd";
import { setToAssignStudents } from "../../../../global/studentsSlice";

export const handleAssignStudents = (num, students = [], dispatch) => {
  return () => {
    let selectedStudents;
    if (num === "all") {
      selectedStudents = students;
    } else {
      selectedStudents = students?.slice(0, Number(num));
    }
    dispatch(setToAssignStudents(selectedStudents));
  };
};

export const handleAssignToUser = (toAssignLeads, setAssignToUser) => {
  return () => {
    if (toAssignLeads.length === 0) {
      message.error("No leads to assign");
      return;
    }
    setAssignToUser(true);
  };
};
