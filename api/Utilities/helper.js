import { useSelector } from "react-redux";
import { useApi } from "../../src/context/apiContext/ApiContext";

export const dbConnector = async (primaryDbConnection) => {
  // Wait for the connection to be ready
  return new Promise((resolve, reject) => {
    primaryDbConnection.on("connected", () => {
      resolve();
    });

    primaryDbConnection.on("error", (err) => {
      reject(err);
    });
  });
};

export const useIDGetStatusesArray = (allStatuses) => {

  const statusIds = useSelector((state) => state.auth.user.statuses);

  let curStatuses = [];
  if (statusIds && allStatuses) {
    curStatuses = allStatuses.filter((status) =>
      statusIds.includes(status._id)
    );
  }

  return curStatuses;
};

export const useIDGetRolesArray = (allRoles) => {
  const rolesIds = useSelector((state) => state.auth.user.roles);

  let curRoles = [];
  if (rolesIds && allRoles) {
    curRoles = allRoles.filter((role) =>
        rolesIds.includes(role._id)
    );
  }

  return curRoles;
};
