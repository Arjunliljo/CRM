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

export const useIDGetStatuses = (type = "name") => {
  const { statuses } = useSelector((state) => state.auth);

  // const status = useSelector((state) => state.auth);
  // console.log(status);


  // const {
  //   statusConfigs: { statuses },
  // } = useApi();

  // let curStatuses = [];
  // curStatuses = statuses?.filter((status) => statusIds.includes(status._id));

  // if (type === "name") {
  //   return curStatuses.map((status) => status.name);
  // }

  return statuses;
};

export const useIDGetRoles = (type = "name") => {
  const { roles } = useSelector((state) => state.auth);
  console.log(roles, "roles");
  return roles;
};
