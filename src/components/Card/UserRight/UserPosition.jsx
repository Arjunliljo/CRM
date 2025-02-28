import {
  getBranchName,
  getRoleName,
  getStatusName,
} from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";


function UserPosition({ user }) {
  const { statusConfigs, roleConfigs, branchConfigs } = useApi();

  const { statuses = [] } = statusConfigs;
  const { roles = [] } = roleConfigs;
  const { branches = [] } = branchConfigs;

  const rolesArray =
    user?.roles?.map((role) => ({
      name: getRoleName(role._id, roles) || "",
      _id: role || "",
    })) || [];

  const branchesArray =
    user?.branches?.map((branch) => ({
      name: getBranchName( branch._id, branches) || "",
      _id: branch || "",
    })) || [];

  const statusArray =
    user?.statuses?.map((status) => ({
      name: getStatusName(status._id, statuses) || "",
      _id: status || "",
    })) || [];

  // const userRoleName = getRoleName(user?.role, roles);

  console.log(user, "user");

  return (
    <div className="profileCardEdituser-box personalUserEdit-status">
      <div className="personalUserEdit-details-heading">
        <span className="name-small">Position</span>
      </div>
      <form className="personalUserEdit-status-elements">
        {/* <span className="personalUserEdit-status-html-for">Role</span> */}
        <div>
          <span className="chat-text">{user?.role?.name || "No role name"}</span>
        </div>
        <span className="personalUserEdit-status-html-for">Managing Roles</span>
        <div
          className="select-user-container"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3rem",
            marginBottom: "0.8rem",
          }}
        >
          {rolesArray.map((role) => (
            <div
              key={role._id}
              style={{
                border: "1px solid #0087d4",
                padding: "0.3rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              {role.name}
            </div>
          ))}
        </div>
        <span className="personalUserEdit-status-html-for">Managing Statuses</span>
        {/* <div className="select-user-container" style={{ display: "flex", flexWrap: "wrap" }}> */}
        <div
          className="select-user-container"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3rem",
            marginBottom: "0.8rem",
          }}
        >
          {statusArray.map((status) => (
            <div
              key={status._id}
              style={{
                border: "1px solid #0087d4",
                padding: "0.3rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              {status.name}
            </div>
          ))}
        </div>
        {/* </div> */}

        <span className="personalUserEdit-status-html-for">Managing Branches</span>
        <div
          className="select-user-container"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3rem",
            marginBottom: "0.8rem",
          }}
        >
          {branchesArray.map((branch) => (
            <div
              key={branch._id}
              style={{
                border: "1px solid #0087d4",
                padding: "0.3rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              {branch.name}
            </div>
          ))}
        </div>
        {/* <div className="personalUserEdit-details-buttons" style={{ display: "flex", flexWrap: "wrap" }}>
          <PrimaryBttn
            style={{
              backgroundColor: "#dadada",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              color: "black",
              fontWeight: "bold",
              marginRight: "0.5rem"
            }}
          >
            Cancel
          </PrimaryBttn>
          <PrimaryBttn
            style={{
              paddingLeft: "2rem",
              paddingRight: "2rem",
              fontWeight: "bold",
            }}
          >
            Add
          </PrimaryBttn>
        </div> */}
      </form>
    </div>
  );
}

export default UserPosition;
