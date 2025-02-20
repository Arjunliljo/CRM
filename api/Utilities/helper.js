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
  const { user } = useSelector((state) => state.auth);
  const statusIds = user?.statuses;

  if (!statusIds || !allStatuses) return [];

  let curStatuses = [];
  if (statusIds && allStatuses) {
    curStatuses = allStatuses.filter((status) =>
      statusIds.includes(status._id)
    );
  }
  return curStatuses;
};

export const useIDGetRolesArray = (allRoles) => {
  const { user } = useSelector((state) => state.auth);
  const rolesIds = user?.roles;

  if (!rolesIds || !allRoles) return [];

  let curRoles = [];
  if (rolesIds && allRoles) {
    curRoles = allRoles.filter((role) => rolesIds.includes(role._id));
  }

  return curRoles;
};

export const useIDGetBranchesArray = (allBranches) => {
  const { user } = useSelector((state) => state.auth);
  const branchesIds = user?.branches;

  if (!branchesIds || !allBranches) return [];

  let curBranches = [];
  if (branchesIds && allBranches) {
    curBranches = allBranches.filter((branch) => branchesIds.includes(branch._id));
  }
  return curBranches;
};

export const useIDGetCountriesArray = (allCountries) => {
  const { user } = useSelector((state) => state.auth);
  const countriesIds = user?.countries;

  if (!countriesIds || !allCountries) return [];

  let curCountries = [];
  if (countriesIds && allCountries) {
    curCountries = allCountries.filter((country) => countriesIds.includes(country._id));
  }
  return curCountries;
};
