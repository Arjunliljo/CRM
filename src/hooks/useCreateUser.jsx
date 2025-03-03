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

  const countryIds = countries.map((country) => country._id || country);
  const branchIds = branches.map((branch) => branch._id || branch);
  const roleIds = selectedRoles.map((role) => role._id || role);
  const statusIds = mainStatuses.map((status) => status._id || status);

  const defaultTabesItems = new Set([
    "Dashboard",
    "Leads",
    "Student",
    "University",
    "Configuration",
    "Profile-edit",
    "User",
    "Branch-managing",
    "Profile-card",
    "Sync",
  ]);

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

  // console.log(statusIds, "statusIds");
console.log(tabs, "tabs");
console.log(defaultTabesItems, 'defoult tab')


  // const filteredTabIds = tabs
  //   .filter((tab) => statusIds.includes(tab._id))
  //   .map((tab) => tab._id);

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
    tabs: tabs,
    password,
    role: role.id,
    autoAssign,
  };

  return userData;
};