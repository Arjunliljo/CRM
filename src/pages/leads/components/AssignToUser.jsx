import NormalButton from "../../../components/buttons/NormalButton";
import Selector from "../../../components/Selectors/Selector";
import { useApi } from "../../../context/apiContext/ApiContext";
import NextBtn from "../../../components/buttons/NextBtn";
import { useEffect, useState } from "react";

export default function AssingToUser({ assigningLeads }) {
  const {
    roleConfigs: { roles = [] },
    usersConfigs: { users = [] },
  } = useApi() || {};

  const [curRole, setCurRole] = useState(roles?.[0]);
  const [curUser, setCurUser] = useState(users?.[0]);

  const [setSelectedUsers, setSetSelectedUsers] = useState([]);

  useEffect(() => {
    if (curRole) {
      const roleId = roles.find((val) => val.name === curRole)?._id;
      setSetSelectedUsers(users.filter((user) => user.role === roleId));
    }
  }, [curRole]);

  return (
    <div className="assign-form">
      <NormalButton
        style={{ margin: "0 auto" }}
      >{`Assign ${assigningLeads.length} Leads To`}</NormalButton>
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
        <NextBtn style={{ margin: "0 auto" }}>Assign</NextBtn>
      </div>
    </div>
  );
}
