import { useSelector } from "react-redux";

export const useCreateUser = () => {
  const {
    countries,
    role,
    branches,
    password,
    autoAssign,
    email,
    name,
    contactNumber,
    employeeId,
    addressOne,
    addressTwo,
    mainStatuses,
    selectedTabs,
    selectedRoles,
  } = useSelector((state) => state.profile);

  const countryIds = countries.map((country) => country._id);
  const branchIds = branches.map((branch) => branch._id);
  const roleIds = selectedRoles.map((role) => role._id);
  const statusIds = mainStatuses.map((status) => status._id);

  const defaultTabesItems = new Set(["Dashboard", "Profile", "Settings"]);

  const { defaultTabs, tabs } = selectedTabs.reduce(
    (acc, tab) => {
      if (defaultTabesItems.has(tab.name)) {
        acc.defaultTabs.push(tab.name);
      } else {
        acc.tabs.push(tab);
      }
      return acc;
    },
    { defaultTabs: [], tabs: [] }
  );


  const filteredTabIds = tabs
    .filter((tab) => statusIds.includes(tab._id))
    .map((tab) => tab._id);


  const userData = {
    name,
    email,
    phone: contactNumber,
    employeeId,
    addressOne,
    addressTwo,
    branches: branchIds,
    countries: countryIds,
    statuses: statusIds,
    roles: roleIds,
    defaultTabs,
    tabs: filteredTabIds,
    password,
    role: role._id,
    autoAssign,
  };

  return userData;
};