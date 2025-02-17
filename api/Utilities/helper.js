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
  const { statuses: statusIds } = useSelector((state) => state.auth);

  const {
    statusConfigs: { statuses },
  } = useApi();

  let curStatuses = [];
  curStatuses = statuses?.filter((status) => statusIds.includes(status._id));

  if (type === "name") {
    return curStatuses.map((status) => status.name);
  }

  return curStatuses;
};
