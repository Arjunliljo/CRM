import {
  getBranchName,
  getRoleName,
  getStatusName,
} from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";

function UserPosition({ user }) {
  const { statusConfigs, roleConfigs, branchConfigs } = useApi();

  console.log(user);
  const { statuses = [] } = statusConfigs;
  const { roles = [] } = roleConfigs;
  const { branches = [] } = branchConfigs;

console.log(branches, "branches");
console.log(statuses,"statuses")
console.log(roles,"role")


  const rolesArray = user?.roles?.map((role) => {

    const roleId = typeof role === 'object' ? role?._id : role;
    if (!roleId) return null;

    return {
      name: getRoleName(roleId, roles),
      _id: roleId,
    };
  }).filter(Boolean) || [];

  const branchesArray = user?.branches?.map((branch) => {
    const branchId = typeof branch === 'object' ? branch?._id : branch;
    if (!branchId) return null;

    return {
      name: getBranchName(branchId, branches),
      _id: branchId,
    };
  }).filter(Boolean) || [];

  const statusArray = user?.statuses?.map((status) => {
         console.log(status, "1")
    const statusId = typeof status === 'object' ? status?._id : status;
    if (!statusId) return null;

    return {
      name: getStatusName(statusId, statuses),
      _id: statusId,
    };
  }).filter(Boolean) || [];

  // Add null check for user.role
  const userRoleName = user?.role ? getRoleName(user.role, roles) : '';

  return (
    <div className="profileCardEdituser-box personalUserEdit-status">
      <div className="personalUserEdit-details-heading">
        <span className="name-small">Position</span>
      </div>
      <form className="personalUserEdit-status-elements">
        {/* <span className="personalUserEdit-status-html-for">Role</span> */}
        <div>
          <span className="chat-text">
            {(user && userRoleName) || user?.role?.name || "No role name"}
          </span>
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
              {role && role?.name}
            </div>
          ))}
        </div>
        <span className="personalUserEdit-status-html-for">
          Managing Statuses
        </span>
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
              {status && status?.name}
            </div>
          ))}
        </div>
        {/* </div> */}

        <span className="personalUserEdit-status-html-for">
          Managing Branches
        </span>
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
              {branch && branch?.name}
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
