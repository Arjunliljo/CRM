import { message } from "antd";
import { setToAssignLeads } from "../../../../global/leadsSlice";

export const handleAssignLeads = (num, leads = [], dispatch) => {
  return () => {
    let selectedLeads;
    if (num === "all") {
      selectedLeads = leads;
    } else {
      selectedLeads = leads?.slice(0, Number(num));
    }
    dispatch(setToAssignLeads(selectedLeads));
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
