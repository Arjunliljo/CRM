import NormalButton from "../../../components/buttons/NormalButton";
import Selector from "../../../components/Selectors/Selector";
import { useApi } from "../../../context/apiContext/ApiContext";
import NextBtn from "../../../components/buttons/NextBtn";
import { useEffect, useState } from "react";
import { message } from "antd";
import apiClient from "../../../../config/axiosInstance";
import { refetchLeads } from "../../../apiHooks/LeadAndApplicationHooks/useLeads";

export default function AssingToUser({ assigningLeads }) {
  const {
    roleConfigs: { roles = [] },
    usersConfigs: { users = [] },
  } = useApi() || {};

  const [curRole, setCurRole] = useState(roles?.[0]);
  const [curUser, setCurUser] = useState(users?.[0]?.name);

  const [setSelectedUsers, setSetSelectedUsers] = useState(users);

  useEffect(() => {
    if (curRole) {
      const roleId = roles.find((val) => val.name === curRole)?._id;

      setSetSelectedUsers(users.filter((user) => user.role === roleId));
    }
  }, [curRole, roles, users]);

  const handleAssign = async () => {
    if (setSelectedUsers.length === 0) {
      message.error("Please select a user");
      return;
    }
    try {
      await apiClient.patch("/lead/leadToUserAssignment", {
        leadIds: assigningLeads.map((lead) => lead._id),
        user: setSelectedUsers.find((user) => user.name === curUser),
      });

      message.success("Leads assigned successfully");
      refetchLeads();
    } catch (error) {
      console.error("Error assigning leads:", error);
      message.error("Error assigning leads");
    }
  };

  return (
    <div className="assign-form">
      <NormalButton
        style={{ margin: "0 auto" }}
      >{`Assign ${assigningLeads?.length} Leads To`}</NormalButton>
      <div className="assign-form-head">
        <Selector
          optionsObj={roles}
          set={curRole}
          onSet={setCurRole}
          redux={false}
          placeholder={"Select Role"}
        />
        <Selector
          optionsObj={setSelectedUsers}
          set={curUser}
          onSet={setCurUser}
          redux={false}
          placeholder={
            setSelectedUsers.length === 0 ? "No User Found" : "Select User"
          }
          disabled={setSelectedUsers.length === 0}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <NextBtn style={{ margin: "0 auto" }} onClick={handleAssign}>
          Assign
        </NextBtn>
      </div>
    </div>
  );
}
