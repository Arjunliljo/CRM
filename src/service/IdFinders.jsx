export const getStatusId = (statusName, statuses) => {
  if (!statusName || !statuses) return [];
  return statuses?.find((obj) => obj.name === statusName)?._id;
};
export const getRoleId = (role, roles) => {
  const roleId = roles.find((obj) => obj.name === role)._id;
  return roleId;
};

export const getCountryId = (country, countries) => {
  const countryId = countries.find((obj) => obj.name === country)._id;
  return countryId;
};

export const getBranchId = (branch, branches) => {
  const branchId = branches.find((obj) => obj.name === branch)._id;
  return branchId;
};
