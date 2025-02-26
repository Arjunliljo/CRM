export const getStatusId = (statusName, statuses) => {
  if (!statusName || !statuses) return null;
  return statuses?.find((obj) => obj.name === statusName)?._id;
};
export const getRoleId = (role, roles) => {
  if ((!role, !roles)) return null;
  const roleId = roles.find((obj) => obj.name === role)?._id;
  return roleId;
};
export const getCountryId = (country, countries) => {
  if (!country || !countries) return null;
  const countryId = countries.find((obj) => obj.name === country)?._id;
  return countryId;
};
export const getBranchId = (branch, branches) => {
  if (!branch || !branches) return null;
  const branchId = branches.find((obj) => obj.name === branch)?._id;
  return branchId;
};
export const getUserId = (user, users) => {
  if (!user || !users) return null;
  const userId = users.find((obj) => obj.name === user)?._id;
  return userId;
};
